import { getEnv } from '@src/constants';
import { TActionModel, TTagModel, TUpdateActionInput } from '@src/domain/models';
import { Entities, TagTypes } from '@src/enums';
import { EntityNotFoundError, InvalidParamError } from '@src/errors';
import {
  ActionRepositoryInterface,
  SegmentRepositoryInterface,
  TagRepositoryInterface,
} from '@src/infra/db/repositories';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';
import { In } from 'typeorm';

import { IUpdateActionUseCase } from './update.interface';

@provideSingleton(UpdateActionUseCase)
export class UpdateActionUseCase implements IUpdateActionUseCase {
  constructor(
    @inject(TYPES.repositories.ActionRepository)
    private readonly actionRepository: ActionRepositoryInterface,
    @inject(TYPES.repositories.TagRepository)
    private readonly tagRepository: TagRepositoryInterface,
    @inject(TYPES.repositories.SegmentRepository)
    private readonly segmentRepository: SegmentRepositoryInterface,
  ) {}

  async execute(idAction: string, input: TUpdateActionInput): Promise<TActionModel | null> {
    const oldAction = await this.actionRepository.selectOne({ id: idAction });

    if (!oldAction) throw new EntityNotFoundError(Entities.ACTION);

    const [originSegmentExists] = await Promise.all([
      this.segmentRepository.selectOne({ id: input.idOriginSegment, idStory: oldAction.idStory }),
      this.validateActionsLimit(oldAction.idStory, input.idOriginSegment),
      this.validateNextSegments(oldAction.idStory, input),
    ]);

    if (!originSegmentExists) throw new EntityNotFoundError(`${Entities} origin`);

    const tagNamesToCreate = await this.tagRepository.checkNonExistentTags(oldAction.idStory, input.tags, 'action');
    const tagsToCreate = tagNamesToCreate.map((name): Partial<TTagModel> => {
      return { name, idStory: oldAction.idStory, type: TagTypes.ACTION };
    });

    const response = await this.actionRepository.update(idAction, input);

    const tagsToDepreciate = await this.tagRepository.checkNonExistentTags(oldAction.idStory, oldAction.tags, 'action');

    await Promise.all([
      this.tagRepository.bulkDelete({ idStory: oldAction.idStory, name: In(tagsToDepreciate) }),
      this.tagRepository.bulkCreate(tagsToCreate),
    ]);

    return response;
  }

  private async validateNextSegments(idStory: string, input: TUpdateActionInput): Promise<void> {
    const nextSegmentsIds = Array.from(
      new Set([input.idSegmentSuccess, ...(input.idSegmentFailure ? [input.idSegmentFailure] : [])]),
    );

    const nextSegments = await this.segmentRepository.selectMany({ id: In(nextSegmentsIds), idStory });

    if (nextSegments.length !== nextSegmentsIds.length) {
      const foundSegmentsIds = nextSegments.map((segment) => segment.id);

      const idsNotFound = nextSegmentsIds.filter((uniqueId) => !foundSegmentsIds.includes(uniqueId));

      throw new InvalidParamError(`Some segment relations were not found: ${idsNotFound}`);
    }
  }

  private async validateActionsLimit(idStory: string, idOriginSegment: string): Promise<void> {
    const actionsCount = await this.actionRepository.count({ idOriginSegment, idStory });

    if (actionsCount >= getEnv().actionLimit) {
      throw new InvalidParamError(`Request exceeds the allowed limit of ${getEnv().actionLimit} actions per segment.`);
    }
  }
}
