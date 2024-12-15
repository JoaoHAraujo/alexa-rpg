import { TagTypes } from '../../enums';
import { TBaseModel } from './base.model';
import { TStoryModel } from './story.model';

export type TTagModel = TBaseModel & {
  name: string;
  type: TagTypes;
  idStory: string;
  story: TStoryModel;
};
