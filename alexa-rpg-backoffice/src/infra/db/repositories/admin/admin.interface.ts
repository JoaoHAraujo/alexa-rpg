import { TAdminModel } from '@src/domain/models';
import { TPagination } from '@src/utils/interfaces/pagination';
import { TPaginationParams } from '@src/utils/pagination';
import { FindOptionsWhere } from 'typeorm';

import { AdminEntity } from '../../entities';
import { AttributeOptions } from '../attribute-selector';

export type TAdminAttributeOptions = AttributeOptions & { password?: boolean };
export type TOptions = { attributes?: TAdminAttributeOptions; relations?: string[] };

export interface AdminRepositoryInterface {
  selectOne(where: FindOptionsWhere<AdminEntity>, options?: TOptions): Promise<TAdminModel | null>;
  selectPagination(
    where: FindOptionsWhere<AdminEntity>,
    paginationParams: TPaginationParams<AdminEntity>,
    options?: TOptions,
  ): Promise<TPagination<TAdminModel>>;
  create(data: Partial<TAdminModel>, attributes?: TAdminAttributeOptions): Promise<TAdminModel>;
  update(id: string, data: Partial<TAdminModel>): Promise<TAdminModel>;
  delete(where: FindOptionsWhere<AdminEntity>): Promise<void>;
}
