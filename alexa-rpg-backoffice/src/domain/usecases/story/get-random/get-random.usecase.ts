import { TStoryModel } from '@src/domain/models';
import { calculateAge } from '@src/helpers/calculate-age';
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

  async getRandom(dateOfBirth: string | Date, limit: number): Promise<TStoryModel[]> {
    const userAge = calculateAge(new Date(dateOfBirth));

    const response = await this.storyRepository.selectRandom(limit, {
      isActive: true,
      ageClass: LessThanOrEqual(userAge),
    });

    return response;
  }
}
