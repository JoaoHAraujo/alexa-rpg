import axios from 'axios';

import { TStoryModel } from '../../models';
import { apiHandleError } from '../../utils';
import { IStoryApi } from './story.interface';

const baseUrl = `${process.env.BACKOFFICE_URL}/story`;

export const StoryApi: IStoryApi = {
  async getById(idStory: string) {
    try {
      const { data } = await axios.get<TStoryModel>(`${baseUrl}/${idStory}`);

      return data;
    } catch (err: any) {
      throw new apiHandleError(this.getById.name, err);
    }
  },

  async getRandom(limit: number) {
    try {
      const { data } = await axios.get<TStoryModel[]>(`${baseUrl}/random`, { params: { limit } });

      return data;
    } catch (err: any) {
      throw new apiHandleError(this.getRandom.name, err);
    }
  },
};
