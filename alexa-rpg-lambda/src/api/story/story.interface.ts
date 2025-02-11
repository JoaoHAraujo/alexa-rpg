import { TSegmentModel, TStoryModel } from '../../models';

export type TGetSegmentByIdResponse = TStoryModel & { firstSegment: TSegmentModel };

export interface IStoryApi {
  getById: (idAmazon: string, idStory: string) => Promise<TGetSegmentByIdResponse | null>;
  getRandom: (idAmazon: string, limit: number, age: number) => Promise<TStoryModel[]>;
}
