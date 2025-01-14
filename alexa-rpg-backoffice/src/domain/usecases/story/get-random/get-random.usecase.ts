import { TStoryModel } from '@src/domain/models';
import { StoryRepositoryInterface } from '@src/infra/db/repositories';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';
import { LessThanOrEqual } from 'typeorm';

import { IGetRandomStoriesUseCase } from './get-random.interface';

@provideSingleton(GetRandomStoriesUseCase)
export class GetRandomStoriesUseCase implements IGetRandomStoriesUseCase {
  constructor(
    @inject(TYPES.repositories.StoryRepository)
    private readonly storyRepository: StoryRepositoryInterface,
  ) {}

  async getRandom(idAmazon: string, age: number, limit: number): Promise<TStoryModel[]> {
    const response = await this.storyRepository.selectRandom(idAmazon, limit, {
      isActive: true,
      ageClass: LessThanOrEqual(age),
    });

    return response;
  }
}
