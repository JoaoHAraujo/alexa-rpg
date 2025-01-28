import { TStoryModel } from '../../models';

export interface IStoryApi {
  getById: (idStory: string) => Promise<TStoryModel>;
  getRandom: (limit: number, age: number) => Promise<TStoryModel[]>;
}
