import { TStoryModel } from '@src/domain/models';

export interface IGetRandomStoriesUseCase {
  getRandom(limit: number): Promise<TStoryModel[]>;
}
