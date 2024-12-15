import { TTagModel } from '@src/domain/models';
import { TPagination } from '@src/utils/interfaces/pagination';
import { TPaginationParams } from '@src/utils/pagination';
import { FindOptionsWhere } from 'typeorm';

import { TagEntity } from '../../entities';
import { AttributeOptions } from '../attribute-selector';

export type TOptions = { attributes?: AttributeOptions; relations?: string[] };

export interface TagRepositoryInterface {
  selectPagination(
    where: FindOptionsWhere<TagEntity>,
    options: TOptions,
    paginationParams: TPaginationParams<TagEntity>,
  ): Promise<TPagination<TTagModel>>;
}
