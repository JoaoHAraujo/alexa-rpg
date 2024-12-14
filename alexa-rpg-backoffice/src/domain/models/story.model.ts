import { TBaseModel } from './base.model';
import { TSegmentModel } from './segment.model';
import { TTagModel } from './tag.model';

export type TStoryModel = TBaseModel & {
  title: string;
  isActive: boolean;
  segments?: TSegmentModel[];
  tags?: TTagModel[];
};

export type TCreateStoryInput = Omit<TStoryModel, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

export type TUpdateStoryInput = Omit<TStoryModel, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
