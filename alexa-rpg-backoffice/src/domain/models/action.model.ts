import { TBaseModel } from './base.model';

export type TActionModel = TBaseModel & {
  idOriginSegment: string;
  idSegmentSuccess: string;
  idSegmentFailure?: string;
  successRate: number;
  description: string;
};

export type TCreateActionInput = Omit<TActionModel, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
