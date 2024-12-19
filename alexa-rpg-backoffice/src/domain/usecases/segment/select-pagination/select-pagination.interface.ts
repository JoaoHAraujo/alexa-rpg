import { TSegmentModel } from '@src/domain/models';
import { SegmentEntity } from '@src/infra/db/entities';
import { TPagination } from '@src/utils/interfaces/pagination';
import { TPaginationParams } from '@src/utils/pagination';

export type TSegmentSearchParams = Partial<Pick<TSegmentModel, 'isFirst' | 'narrative' | 'tags'>>;

export interface ISelectSegmentPaginationUseCase {
  execute(
    idStory: string,
    searchParams: TSegmentSearchParams,
    paginationParams: TPaginationParams<SegmentEntity>,
  ): Promise<TPagination<TSegmentModel>>;
}
