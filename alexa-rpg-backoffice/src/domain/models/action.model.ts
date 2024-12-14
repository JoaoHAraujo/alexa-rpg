import { TBaseModel } from './base.model';

export type TActionModel = TBaseModel & {
  idOriginSegment: string;
  idSegmentSuccess: string;
  idSegmentFailure?: string;
  successRate: number;
  description: string;
};

export type TCreateActionInput = {
  idOriginSegment: string;
  actions: Array<Omit<TActionModel, 'id' | 'idOriginSegment' | 'createdAt' | 'updatedAt' | 'deletedAt'>>;
};
