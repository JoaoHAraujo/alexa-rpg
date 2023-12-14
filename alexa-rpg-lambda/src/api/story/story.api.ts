import { StoryModel } from '@src/models';
import { apiHandleError } from '@src/utils';
import axios from 'axios';

import { IStoryApi } from './story.interface';

export const StoryApi: IStoryApi = {
  async getById(idStory: string) {
    try {
      const { data } = await axios.get(`https://3427-168-205-243-14.ngrok-free.app/v1/story/${idStory}`);

      return data as StoryModel;
    } catch (err: any) {
      throw new apiHandleError(this.getById.name, err);
    }
  },
};
