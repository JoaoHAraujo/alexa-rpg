import { StoryModel } from '@src/domain/models';

export interface IGetRandomStoriesUseCase {
  getRandom(limit: number): Promise<StoryModel[]>;
}
