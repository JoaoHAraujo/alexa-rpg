import { TActionModel } from './action.model';
import { TBaseModel } from './base.model';
import { TStoryModel } from './story.model';

export type TSegmentModel = TBaseModel & {
  idStory: string;
  narrative: string;
  isFirst: boolean;
  story?: TStoryModel;
  actions?: TActionModel[];
};

export type TCreateSegmentInput = Omit<TSegmentModel, 'id' | 'isFirst' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
export type TUpdateSegmentInput = Pick<TSegmentModel, 'narrative'>;
