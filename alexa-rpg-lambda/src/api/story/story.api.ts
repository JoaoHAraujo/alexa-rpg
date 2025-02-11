import axios from 'axios';

import { getEnv } from '../../constants';
import { getBaseHeaders } from '../../helpers/get-base-headers';
import { TStoryModel } from '../../models';
import { apiHandleError } from '../../utils';
import { IStoryApi, TGetSegmentByIdResponse } from './story.interface';

const baseUrl = `${getEnv().backofficeBaseUrl}/story`;

export const StoryApi: IStoryApi = {
  async getById(idAmazon: string, idStory: string) {
    try {
      const { data } = await axios.get<TGetSegmentByIdResponse>(`${baseUrl}/${idStory}`, {
        headers: getBaseHeaders(idAmazon),
      });

      return data;
    } catch (err: any) {
      throw new apiHandleError(this.getById.name, err);
    }
  },

  async getRandom(idAmazon: string, limit: number, age: number) {
    try {
      const { data } = await axios.get<TStoryModel[]>(`${baseUrl}/random`, {
        params: { limit, age },
        headers: getBaseHeaders(idAmazon),
      });

      return data;
    } catch (err: any) {
      throw new apiHandleError(this.getRandom.name, err);
    }
  },
};
