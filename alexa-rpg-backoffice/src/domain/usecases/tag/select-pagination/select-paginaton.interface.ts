import { TTagModel } from '@src/domain/models';
import { TagEntity } from '@src/infra/db/entities';
import { TPaginationParams } from '@src/utils/pagination';

import { TPagination } from '../../../../utils/interfaces/pagination';

export type TTagSearchParams = Partial<Pick<TTagModel, 'name' | 'type'>>;

export interface ISelectTagPaginationUseCase {
  execute(
    idStory: string,
    searchParams: TTagSearchParams,
    paginationParams: TPaginationParams<TagEntity>,
  ): Promise<TPagination<TTagModel>>;
}
