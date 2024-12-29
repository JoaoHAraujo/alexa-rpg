import { TActionModel } from './action.model';
import { TBaseModel } from './base.model';
import { TStoryModel } from './story.model';

export type TSegmentModel = TBaseModel & {
  idStory: string;
  narrative: string;
  tags: string[];
  isFirst: boolean;
  story?: TStoryModel;
  actions?: TActionModel[];
};
