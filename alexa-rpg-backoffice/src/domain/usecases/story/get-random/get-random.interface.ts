import { TStoryModel } from '@src/domain/models';

export interface IGetRandomStoriesUseCase {
  getRandom(age: number | Date, limit: number): Promise<TStoryModel[]>;
}
