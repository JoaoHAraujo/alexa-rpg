import { TStoryModel } from '../../models';

export interface IStoryApi {
  getById: (idAmazon: string, idStory: string) => Promise<TStoryModel>;
  getRandom: (idAmazon: string, limit: number, age: number) => Promise<TStoryModel[]>;
}
