import { TAdminModel } from '@src/domain/models';
import { AdminEntity } from '@src/infra/db/entities';
import { AdminRepositoryInterface } from '@src/infra/db/repositories';
import { TPagination } from '@src/utils/interfaces/pagination';
import { TYPES } from '@src/utils/inversify-types';
import { TPaginationParams } from '@src/utils/pagination';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';
import { ILike, Raw } from 'typeorm';

import { ISelectAdminPaginationUseCase, TAdminParams } from './select-paginated.interface';

@provideSingleton(SelectAdminPaginationUseCase)
export class SelectAdminPaginationUseCase implements ISelectAdminPaginationUseCase {
  constructor(
    @inject(TYPES.repositories.AdminRepository)
    private readonly adminRepository: AdminRepositoryInterface,
  ) {}

  async execute(
    searchParams: TAdminParams,
    paginationParams: TPaginationParams<AdminEntity>,
  ): Promise<TPagination<TAdminModel>> {
    const response = await this.adminRepository.selectPagination(
      {
        ...(searchParams.name && {
          name: Raw((alias) => `unaccent(${alias}) ILIKE unaccent(:searchName)`, {
            searchName: `%${searchParams.name}%`,
          }),
        }),
        //   ...(searchParams.name && { name: ILike(`%${searchParams.name}%`) }),
        ...(searchParams.email && { email: ILike(`%${searchParams.email}%`) }),
      },
      paginationParams,
    );

    return response;
  }
}
