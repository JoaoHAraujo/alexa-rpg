import { Entities } from '@src/enums';
import { EntityNotFoundError } from '@src/errors';
import { StoryRepositoryInterface } from '@src/infra/db/repositories';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';

import { IDeleteStoryUseCase } from './delete.interface';

@provideSingleton(DeleteStoryUseCase)
export class DeleteStoryUseCase implements IDeleteStoryUseCase {
  constructor(
    @inject(TYPES.repositories.StoryRepository)
    private readonly storyRepository: StoryRepositoryInterface,
  ) {}

  async execute(idStory: string): Promise<void> {
    const story = await this.storyRepository.selectOne({ id: idStory });

    if (!story) throw new EntityNotFoundError(Entities.STORY);

    await this.storyRepository.delete(idStory);
  }
}
