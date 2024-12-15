import { TTagModel } from '@src/domain/models';
import { TagTypes } from '@src/enums';
import { TagRepositoryInterface } from '@src/infra/db/repositories';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';
import { In } from 'typeorm';

import { ICreateResultingTagUseCase } from './create-resulting.interface';

@provideSingleton(CreateResultingTagUseCase)
export class CreateResultingTagUseCase implements ICreateResultingTagUseCase {
  constructor(
    @inject(TYPES.repositories.TagRepository)
    private tagRepository: TagRepositoryInterface,
  ) {}

  async execute(idStory: string, tagsToCheck: string[], type: TagTypes): Promise<TTagModel[]> {
    const existentTags = await this.tagRepository.selectMany({
      idStory,
      type,
      name: In(tagsToCheck),
    });

    let createdTags: TTagModel[] = [];

    if (existentTags.length !== tagsToCheck.length) {
      const existentTagNames = existentTags.map((tag) => tag.name);

      const tagNamesToCreate = tagsToCheck.filter((tagToCheck) => !existentTagNames.includes(tagToCheck));

      const tagsToCreate = tagNamesToCreate.map((name): Partial<TTagModel> => {
        return {
          name,
          idStory,
          type,
        };
      });

      createdTags = await this.tagRepository.bulkCreate(tagsToCreate);
    }

    return createdTags;
  }
}
