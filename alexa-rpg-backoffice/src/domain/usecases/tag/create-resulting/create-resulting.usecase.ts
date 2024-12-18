import { TTagModel } from '@src/domain/models';
import { MapTagTypeToEntity, TagTypes, TEntitiesWithTags } from '@src/enums';
import { InvalidParamError } from '@src/errors';
import { TagRepositoryInterface } from '@src/infra/db/repositories';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';

import { ICreateResultingTagUseCase } from './create-resulting.interface';

@provideSingleton(CreateResultingTagUseCase)
export class CreateResultingTagUseCase implements ICreateResultingTagUseCase {
  constructor(
    @inject(TYPES.repositories.TagRepository)
    private tagRepository: TagRepositoryInterface,
  ) {}

  async execute(idStory: string, tagsToCheck: string[], type: TagTypes): Promise<TTagModel[]> {
    const entity = this.defineEntity(type);
    const tagNamesToCreate = await this.tagRepository.checkNonExistentTags(idStory, tagsToCheck, entity);

    const tagsToCreate = tagNamesToCreate.map((name): Partial<TTagModel> => {
      return {
        name,
        idStory,
        type,
      };
    });

    const createdTags = await this.tagRepository.bulkCreate(tagsToCreate);

    return createdTags;
  }

  private defineEntity(type: TagTypes): TEntitiesWithTags {
    const entity = MapTagTypeToEntity.get(type);

    if (!entity) throw new InvalidParamError(`TagType: ${type}`);

    return entity;
  }
}
