import { StoryModel } from '@src/models';

export interface IStoryApi {
  getById: (idStory: string) => Promise<StoryModel>;
}
