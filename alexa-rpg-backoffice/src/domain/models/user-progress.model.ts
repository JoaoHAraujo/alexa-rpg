import { TBaseModel } from './base.model';
import { TSegmentModel } from './segment.model';
import { TStoryModel } from './story.model';

export type TUserProgressModel = TBaseModel & {
  idAmazon: string;
  idStory: string;
  idSegment: string;
  finalized: boolean;
  segment?: TSegmentModel;
  story?: TStoryModel;
};
