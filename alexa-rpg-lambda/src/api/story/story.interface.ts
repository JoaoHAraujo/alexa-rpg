import { StoryModel } from '../../models';

export interface IStoryApi {
  getById: (idStory: string) => Promise<StoryModel>;
}
