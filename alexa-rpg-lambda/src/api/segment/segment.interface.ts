import { TSegmentModel } from '../../models';

export interface ISegmentApi {
  getById: (idAmazon: string, idSegment: string) => Promise<TSegmentModel>;
}
