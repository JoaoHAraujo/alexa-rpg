import { StoryModel } from '@src/domain/models';

export interface IGetStoryByIdUseCase {
  getById(idStory: string): Promise<StoryModel>;
}
