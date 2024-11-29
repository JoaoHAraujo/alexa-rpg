import { TSegmentModel, TStoryModel } from '../../../models';

export type TGetStoryByIdResponse = TStoryModel & { firstSegment: TSegmentModel };

export interface IGetStoryByIdUseCase {
  getById(idStory: string): Promise<TGetStoryByIdResponse>;
}
