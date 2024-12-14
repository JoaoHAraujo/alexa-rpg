import { TBaseModel } from './base.model';

export type TSegmentModel = TBaseModel & {
  idStory: string;
  narrative: string;
  isFirst: boolean;
};

export type TCreateSegmentInput = Omit<TSegmentModel, 'id' | 'isFirst' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
export type TUpdateSegmentInput = Pick<TSegmentModel, 'narrative'>;
