import { TActionModel } from '@src/domain/models';
import { TPagination } from '@src/utils/interfaces/pagination';
import { TPaginationParams } from '@src/utils/pagination';
import { FindOptionsWhere } from 'typeorm';

import { ActionEntity } from '../../entities';
import { AttributeOptions } from '../attribute-selector';

export type TOptions = { attributes?: AttributeOptions; relations?: string[] };

export interface ActionRepositoryInterface {
  selectOne(where: FindOptionsWhere<ActionEntity>, options?: TOptions): Promise<TActionModel | null>;
  selectMany(where: FindOptionsWhere<ActionEntity>, options?: TOptions): Promise<TActionModel[]>;
  selectPagination(
    where: FindOptionsWhere<ActionEntity>,
    paginationParams: TPaginationParams<ActionEntity>,
    options?: TOptions,
  ): Promise<TPagination<TActionModel>>;
  create(data: Partial<TActionModel>, attributes?: AttributeOptions): Promise<TActionModel>;
  bulkCreate(data: Array<Partial<TActionModel>>): Promise<TActionModel[]>;
  count(where: FindOptionsWhere<ActionEntity>): Promise<number>;
  update(id: string, data: Partial<TActionModel>): Promise<TActionModel | null>;
  delete(where: FindOptionsWhere<ActionEntity>): Promise<void>;
}
