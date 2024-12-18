import { MapTagTypeToEntity, TagTypes, TEntitiesWithTags } from '@src/enums';
import { InvalidParamError } from '@src/errors';
import { TagRepositoryInterface } from '@src/infra/db/repositories';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';
import { In } from 'typeorm';

import { IDeleteDepreciatedTagUseCase } from './delete-depreciated.interface';

@provideSingleton(DeleteDepreciatedTagUseCase)
export class DeleteDepreciatedTagUseCase implements IDeleteDepreciatedTagUseCase {
  constructor(
    @inject(TYPES.repositories.TagRepository)
    private tagRepository: TagRepositoryInterface,
  ) {}

  async execute(idStory: string, tagsToCheck: string[], type: TagTypes): Promise<void> {
    const entity = this.defineEntity(type);
    const tagNamesToDelete = await this.tagRepository.checkNonExistentTags(idStory, tagsToCheck, entity);

    await this.tagRepository.bulkDelete({ idStory, type: TagTypes.SEGMENT, name: In(tagNamesToDelete) });
  }

  private defineEntity(type: TagTypes): TEntitiesWithTags {
    const entity = MapTagTypeToEntity.get(type);

    if (!entity) throw new InvalidParamError(`TagType: ${type}`);

    return entity;
  }
}
