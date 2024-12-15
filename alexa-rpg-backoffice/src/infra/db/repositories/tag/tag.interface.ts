import { TTagModel } from '@src/domain/models';
import { TPaginationParams } from '@src/utils/pagination';
import { FindOptionsWhere } from 'typeorm';

import { TPagination } from '../../../../utils/interfaces/pagination';
import { TagEntity } from '../../entities';
import { AttributeOptions } from '../attribute-selector';

export type TOptions = { attributes?: AttributeOptions; relations?: string[] };

export interface TagRepositoryInterface {
  selectPagination(
    where: FindOptionsWhere<TagEntity>,
    paginationOptions: TPaginationParams<TagEntity>,
    options?: TOptions,
  ): Promise<TPagination<TTagModel>>;
}
