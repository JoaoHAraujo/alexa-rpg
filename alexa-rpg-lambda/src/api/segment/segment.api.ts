import axios from 'axios';

import { getEnv } from '../../constants';
import { TSegmentModel } from '../../models';
import { apiHandleError } from '../../utils';
import { getBaseHeaders } from '../../helpers/get-base-headers';
import { ISegmentApi } from './segment.interface';

const baseUrl = `${getEnv().backofficeBaseUrl}/segment`;

export const SegmentApi: ISegmentApi = {
  async getById(idAmazon: string, idSegment: string) {
    try {
      const { data } = await axios.get<TSegmentModel>(`${baseUrl}/${idSegment}`, {
        headers: getBaseHeaders(idAmazon),
      });

      return data;
    } catch (err) {
      throw new apiHandleError(this.getById.name, err);
    }
  },
};
