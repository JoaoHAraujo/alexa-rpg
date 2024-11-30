export type TSegmentModel = {
  id: string;
  idStory: string;
  narrative: string;
  isFirst: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
};

export type TCreateSegmentInput = Omit<TSegmentModel, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;