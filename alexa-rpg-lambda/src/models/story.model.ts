import { TBaseModel } from './base.model';
import { TSegmentModel } from './segment.model';

export type TStoryModel = TBaseModel & {
  title: string;
  isActive: boolean;
  segments?: TSegmentModel[];
};
