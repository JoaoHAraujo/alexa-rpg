import { getEnv } from '@src/constants';
import { TActionModel, TCreateActionInput } from '@src/domain/models';
import { Entities } from '@src/enums';
import { EntityNotFoundError, InvalidParamError } from '@src/errors';
import { SegmentRepositoryInterface } from '@src/infra/db/repositories';
import { ActionRepositoryInterface } from '@src/infra/db/repositories/action';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';
import { In } from 'typeorm';

import { ICreateActionUseCase } from './create.interface';

@provideSingleton(CreateActionUseCase)
export class CreateActionUseCase implements ICreateActionUseCase {
  constructor(
    @inject(TYPES.repositories.ActionRepository)
    private readonly actionRepository: ActionRepositoryInterface,
    @inject(TYPES.repositories.SegmentRepository)
    private readonly segmentRepository: SegmentRepositoryInterface,
  ) {}

  async execute(data: TCreateActionInput): Promise<TActionModel> {
    const nextSegmentsIds = Array.from(
      new Set([data.idSegmentSuccess, ...(data.idSegmentFailure ? [data.idSegmentFailure] : [])]),
    );

    const [originSegmentExists, segmentsRelations, actionsCount] = await Promise.all([
      this.segmentRepository.selectOne({ id: data.idOriginSegment }),
      this.segmentRepository.selectMany({ id: In(nextSegmentsIds) }),
      this.actionRepository.count({ idOriginSegment: data.idOriginSegment }),
    ]);

    if (!originSegmentExists) throw new EntityNotFoundError(`${Entities} origin`);

    if (actionsCount >= getEnv().actionLimit) {
      throw new InvalidParamError(`Request exceeds the allowed limit of ${getEnv().actionLimit} actions per segment.`);
    }

    if (segmentsRelations.length !== nextSegmentsIds.length) {
      const foundSegmentsIds = segmentsRelations.map((segment) => segment.id);

      const idsNotFound = nextSegmentsIds.filter((uniqueId) => !foundSegmentsIds.includes(uniqueId));

      throw new InvalidParamError(`Some segment relations were not found: ${idsNotFound}`);
    }

    const actionSaved = await this.actionRepository.create({ ...data, idStory: originSegmentExists.idStory });

    return actionSaved;
  }
}
