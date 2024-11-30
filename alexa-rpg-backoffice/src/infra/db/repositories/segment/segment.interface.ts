import { TSegmentModel } from '@src/domain/models';
import { FindOptionsWhere } from 'typeorm';

import { SegmentEntity } from '../../entities';
import { AttributeOptions } from '../attribute-selector';

export type TOptions = { attributes?: AttributeOptions; relations?: string[] };

export interface SegmentRepositoryInterface {
  selectOne(where: FindOptionsWhere<SegmentEntity>, options?: TOptions): Promise<TSegmentModel | null>;
  create(data: Partial<TSegmentModel>, attributes?: AttributeOptions): Promise<TSegmentModel>;
  delete(id: string): Promise<void>;
  update(id: string, data: Partial<TSegmentModel>): Promise<TSegmentModel>;
}
