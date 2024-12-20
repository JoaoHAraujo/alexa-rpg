import { TActionModel } from '@src/domain/models';
import { ActionEntity } from '@src/infra/db/entities';
import { TPagination } from '@src/utils/interfaces/pagination';
import { TPaginationParams } from '@src/utils/pagination';

export type TSuccessRateComparator = 'lt' | 'lte' | 'bt' | 'bte';

export type TActionParams = Partial<Pick<TActionModel, 'description' | 'successRate' | 'tags'>> & {
  successRateComparator?: TSuccessRateComparator;
};
export interface ISelectActionPaginationUseCase {
  execute(
    idStory: string,
    searchParams: TActionParams,
    paginationParams: TPaginationParams<ActionEntity>,
  ): Promise<TPagination<TActionModel>>;
}
