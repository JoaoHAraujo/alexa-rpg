import axios from 'axios';

import { TUserProgressModel } from '../../models';
import { apiHandleError } from '../../utils';
import { IUserProgressApi } from './user-progress.interface';

const baseUrl = `${process.env.BACKOFFICE_URL}/user-progress`;
const baseHeaders = (idAmazon: string) => {
  return { 'x-id-amazon': idAmazon };
};

export const UserProgressApi: IUserProgressApi = {
  async getAllFromUser(idAmazon: string, age: number): Promise<TUserProgressModel[]> {
    try {
      const { data } = await axios.get<TUserProgressModel[]>(`${baseUrl}/all`, {
        params: { age },
        headers: baseHeaders(idAmazon),
      });

      return data;
    } catch (err) {
      throw new apiHandleError(this.getAllFromUser.name, err);
    }
  },

  async updateProgress(idAmazon: string, body: { idStory: string; idNewSegment: string }): Promise<TUserProgressModel> {
    try {
      const { data } = await axios.put<TUserProgressModel>(baseUrl, body, { headers: baseHeaders(idAmazon) });

      return data;
    } catch (err) {
      throw new apiHandleError(this.updateProgress.name, err);
    }
  },

  async finalizeProgress(idAmazon: string, idProgress: string): Promise<boolean> {
    try {
      const { data } = await axios.put<boolean>(`${baseUrl}/finalize/${idProgress}`, undefined, {
        headers: baseHeaders(idAmazon),
      });

      return data;
    } catch (err) {
      throw new apiHandleError(this.finalizeProgress.name, err);
    }
  },
};
