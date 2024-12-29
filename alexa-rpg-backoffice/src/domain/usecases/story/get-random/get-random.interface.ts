import { TStoryModel } from '@src/domain/models';

export interface IGetRandomStoriesUseCase {
  getRandom(dateOfBirth: string | Date, limit: number): Promise<TStoryModel[]>;
}
