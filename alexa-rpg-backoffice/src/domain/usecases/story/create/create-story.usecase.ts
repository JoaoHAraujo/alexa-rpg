import { StoryModel } from '@src/domain/models';
import { Entities } from '@src/enums';
import { EntityAlreadyExistsError } from '@src/errors';
import { StoryRepositoryInterface } from '@src/infra/db/repositories';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';

import { ICreateStoryUseCase } from './create-story.interface';

@provideSingleton(CreateStoryUseCase)
export class CreateStoryUseCase implements ICreateStoryUseCase {
  constructor(
    @inject(TYPES.repositories.StoryRepository)
    private readonly storyRepository: StoryRepositoryInterface,
  ) {}

  async create(data: Omit<StoryModel, 'id'>): Promise<StoryModel> {
    const storyExists = await this.storyRepository.selectOne({ title: data.title });

    if (storyExists) {
      throw new EntityAlreadyExistsError(Entities.STORY);
    }

    const result = await this.storyRepository.create(data);

    return result;
  }
}
