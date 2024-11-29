import { TSegmentModel } from '@src/domain/models';
import { FindOptionsWhere } from 'typeorm';

import { SegmentEntity } from '../../entities';
import { AttributeOptions } from '../attribute-selector';

export interface SegmentRepositoryInterface {
  selectOne(where: FindOptionsWhere<SegmentEntity>, options?: AttributeOptions): Promise<TSegmentModel | null>;
  create(data: Partial<TSegmentModel>, options?: AttributeOptions): Promise<TSegmentModel>;
}
