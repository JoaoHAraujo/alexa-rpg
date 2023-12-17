import axios from 'axios';

import { StoryModel } from '../../models';
import { apiHandleError } from '../../utils';
import { IStoryApi } from './story.interface';

const baseUrl = `${process.env.BACKOFFICE_URL}/story`;

export const StoryApi: IStoryApi = {
  async getById(idStory: string) {
    try {
      const { data } = await axios.get<StoryModel>(`${baseUrl}/${idStory}`);

      return data;
    } catch (err: any) {
      throw new apiHandleError(this.getById.name, err);
    }
  },

  async getRanddom(limit: number) {
    try {
      const { data } = await axios.get<StoryModel[]>(`${baseUrl}/random`, { params: { limit } });

      return data;
    } catch (err: any) {
      throw new apiHandleError(this.getRanddom.name, err);
    }
  },
};
