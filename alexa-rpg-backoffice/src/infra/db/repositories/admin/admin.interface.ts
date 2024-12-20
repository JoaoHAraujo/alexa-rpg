import { TAdminModel } from '@src/domain/models';
import { FindOptionsWhere } from 'typeorm';

import { AdminEntity } from '../../entities';
import { AttributeOptions } from '../attribute-selector';

export type TAdminAttributeOptions = AttributeOptions & { password?: boolean };
export type TOptions = { attributes?: TAdminAttributeOptions; relations?: string[] };

export interface AdminRepositoryInterface {
  selectOne(where: FindOptionsWhere<AdminEntity>, options?: TOptions): Promise<TAdminModel | null>;
  create(data: Partial<TAdminModel>, attributes?: TAdminAttributeOptions): Promise<TAdminModel>;
}
