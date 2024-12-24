import { TAdminModel } from '@src/domain/models';
import { AdminEntity } from '@src/infra/db/entities';
import { TPagination } from '@src/utils/interfaces/pagination';
import { TPaginationParams } from '@src/utils/pagination';

export type TAdminParams = Partial<Pick<TAdminModel, 'name' | 'email'>>;

export interface ISelectAdminPaginationUseCase {
  execute(
    searchParams: TAdminParams,
    paginationParams: TPaginationParams<AdminEntity>,
  ): Promise<TPagination<TAdminModel>>;
}
