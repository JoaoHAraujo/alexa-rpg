export type TStoryModel = {
  id: string;
  title: string;
  isActive: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
};

export type TCreateStoryInput = Omit<TStoryModel, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

export type TUpdateStoryInput = Omit<TStoryModel, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
