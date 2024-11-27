import { TStoryModel } from '@src/domain/models';
import { StoryRepositoryInterface } from '@src/infra/db/repositories';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';

import { IGetRandomStoriesUseCase } from './get-random.interface';

@provideSingleton(GetRandomStoriesUseCase)
export class GetRandomStoriesUseCase implements IGetRandomStoriesUseCase {
  constructor(
    @inject(TYPES.repositories.StoryRepository)
    private readonly storyRepository: StoryRepositoryInterface,
  ) {}

  async getRandom(limit: number): Promise<TStoryModel[]> {
    const response = await this.storyRepository.selectRandom(limit, { isActive: true });

    return response;
  }
}
