import { TStoryModel } from '@src/domain/models';

export interface IGetRandomStoriesUseCase {
  getRandom(idAmazon: string, age: number, limit: number): Promise<TStoryModel[]>;
}
