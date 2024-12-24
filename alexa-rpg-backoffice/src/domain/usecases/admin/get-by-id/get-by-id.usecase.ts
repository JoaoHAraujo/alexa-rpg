import { TAdminModel } from '@src/domain/models';
import { Entities } from '@src/enums';
import { EntityNotFoundError } from '@src/errors';
import { AdminRepositoryInterface } from '@src/infra/db/repositories';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';

import { IGetAdminByIdUseCase } from './get-by-id.interface';

@provideSingleton(GetAdminByIdUseCase)
export class GetAdminByIdUseCase implements IGetAdminByIdUseCase {
  constructor(@inject(TYPES.repositories.AdminRepository) private readonly adminRepository: AdminRepositoryInterface) {}

  async execute(idAdmin: string): Promise<TAdminModel | null> {
    const adminExists = await this.adminRepository.selectOne({ id: idAdmin });

    if (!adminExists) throw new EntityNotFoundError(Entities.ADMIN);

    return adminExists;
  }
}
