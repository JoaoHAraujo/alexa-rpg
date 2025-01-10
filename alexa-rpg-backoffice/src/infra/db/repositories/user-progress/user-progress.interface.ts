import { TUserProgressModel } from '@src/domain/models';
import { FindOptionsWhere } from 'typeorm';

import { UserProgressEntity } from '../../entities';
import { AttributeOptions } from '../attribute-selector';

export type TOptions = { attributes?: AttributeOptions; relations?: string[] };

export interface UserProgressRepositoryInterface {
  selectOne(where: FindOptionsWhere<UserProgressEntity>, options?: TOptions): Promise<TUserProgressModel | null>;
  selectMany(where: FindOptionsWhere<UserProgressEntity>, options?: TOptions): Promise<TUserProgressModel[]>;
  create(data: Partial<TUserProgressModel>): Promise<TUserProgressModel>;
  update(id: string, data: Partial<TUserProgressModel>): Promise<TUserProgressModel>;
}
