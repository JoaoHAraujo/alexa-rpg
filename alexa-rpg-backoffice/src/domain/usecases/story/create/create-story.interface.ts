import { StoryModel } from '@src/domain/models';

export interface ICreateStoryUseCase {
  create(data: Omit<StoryModel, 'id'>): Promise<StoryModel>;
}
