import { TBaseModel } from './base.model';
import { TSegmentModel } from './segment.model';

export type TStoryModel = TBaseModel & {
  title: string;
  isActive: boolean;
  segments?: TSegmentModel[];
};

export type TCreateStoryInput = Omit<TStoryModel, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

export type TUpdateStoryInput = Omit<TStoryModel, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
