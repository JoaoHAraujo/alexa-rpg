import { TActionModel, TTagModel, TUpdateActionInput } from '@src/domain/models';
import { Entities, TagTypes } from '@src/enums';
import { EntityNotFoundError } from '@src/errors';
import { ActionRepositoryInterface, TagRepositoryInterface } from '@src/infra/db/repositories';
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
  ) {}

  async execute(idAction: string, input: TUpdateActionInput): Promise<TActionModel | null> {
    const oldAction = await this.actionRepository.selectOne({ id: idAction });

    if (!oldAction) throw new EntityNotFoundError(Entities.ACTION);

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
}
