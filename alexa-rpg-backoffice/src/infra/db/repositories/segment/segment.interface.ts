import { TSegmentModel } from '@src/domain/models';
import { TPagination } from '@src/utils/interfaces/pagination';
import { TPaginationParams } from '@src/utils/pagination';
import { FindOptionsWhere } from 'typeorm';

import { SegmentEntity } from '../../entities';
import { AttributeOptions } from '../attribute-selector';

export type TOptions = { attributes?: AttributeOptions; relations?: string[] };

export interface SegmentRepositoryInterface {
  selectOne(where: FindOptionsWhere<SegmentEntity>, options?: TOptions): Promise<TSegmentModel | null>;
  selectMany(where: FindOptionsWhere<SegmentEntity>, options?: TOptions): Promise<TSegmentModel[]>;
  selectPagination(
    where: FindOptionsWhere<SegmentEntity>,
    paginationParams: TPaginationParams<SegmentEntity>,
    options?: TOptions,
  ): Promise<TPagination<TSegmentModel>>;
  create(data: Partial<TSegmentModel>, attributes?: AttributeOptions): Promise<TSegmentModel>;
  delete(id: string): Promise<void>;
  update(id: string, data: Partial<TSegmentModel>): Promise<TSegmentModel>;
}
