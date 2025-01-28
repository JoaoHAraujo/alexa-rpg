import axios from 'axios';

import { getEnv } from '../../constants';
import { TStoryModel } from '../../models';
import { apiHandleError } from '../../utils';
import { IStoryApi } from './story.interface';

const baseUrl = `${getEnv().backofficeBaseUrl}/story`;

export const StoryApi: IStoryApi = {
  async getById(idStory: string) {
    try {
      const { data } = await axios.get<TStoryModel>(`${baseUrl}/${idStory}`);

      return data;
    } catch (err: any) {
      throw new apiHandleError(this.getById.name, err);
    }
  },

  async getRandom(limit: number, age: number) {
    try {
      const { data } = await axios.get<TStoryModel[]>(`${baseUrl}/random`, { params: { limit, age } });

      return data;
    } catch (err: any) {
      throw new apiHandleError(this.getRandom.name, err);
    }
  },
};
