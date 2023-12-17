import axios from 'axios';

import { StoryModel } from '../../models';
import { apiHandleError } from '../../utils';
import { IStoryApi } from './story.interface';

const baseUrl = `${process.env.BACKOFFICE_URL}/story`;

export const StoryApi: IStoryApi = {
  async getById(idStory: string) {
    try {
      const { data } = await axios.get(`${baseUrl}/${idStory}`);

      return data as StoryModel;
    } catch (err: any) {
      throw new apiHandleError(this.getById.name, err);
    }
  },
};
