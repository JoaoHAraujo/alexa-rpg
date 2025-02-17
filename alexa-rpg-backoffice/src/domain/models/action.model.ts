import { TBaseModel } from './base.model';
import { TSegmentModel } from './segment.model';

export type TActionModel = TBaseModel & {
  idStory: string;
  idOriginSegment: string;
  idSegmentSuccess: string;
  idSegmentFailure?: string;
  successRate: number;
  description: string;
  tags: string[];
  originSegment?: TSegmentModel;
  segmentSuccess?: TSegmentModel;
  segmentFailure?: TSegmentModel;
};

export type TCreateActionInput = Omit<TActionModel, 'id' | 'idStory' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

export type TUpdateActionInput = Pick<
  TActionModel,
  'description' | 'idOriginSegment' | 'idSegmentFailure' | 'idSegmentSuccess' | 'successRate' | 'tags'
>;
