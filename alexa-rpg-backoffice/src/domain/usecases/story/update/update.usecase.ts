import { TStoryModel, TUpdateStoryInput } from '@src/domain/models';
import { EntityNotFoundError } from '@src/errors';
import { StoryRepositoryInterface } from '@src/infra/db/repositories';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';

import { IUpdateStoryUseCase } from './update.interface';

@provideSingleton(UpdateStoryUseCase)
export class UpdateStoryUseCase implements IUpdateStoryUseCase {
  constructor(
    @inject(TYPES.repositories.StoryRepository)
    private readonly storyRepository: StoryRepositoryInterface,
  ) {}

  async execute(id: string, input: TUpdateStoryInput): Promise<TStoryModel> {
    const story = await this.storyRepository.selectOne({ id });

    if (!story) throw new EntityNotFoundError('Story');

    const updatedStory = await this.storyRepository.update(id, input);

    return updatedStory;
  }
}
