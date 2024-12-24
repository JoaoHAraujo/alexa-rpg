import { Entities } from '@src/enums';
import { EntityNotFoundError } from '@src/errors';
import { AdminRepositoryInterface } from '@src/infra/db/repositories';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';

import { IDeleteAdminUseCase } from './delete.interface';

@provideSingleton(DeleteAdminUseCase)
export class DeleteAdminUseCase implements IDeleteAdminUseCase {
  constructor(
    @inject(TYPES.repositories.AdminRepository)
    private readonly adminRepository: AdminRepositoryInterface,
  ) {}

  async execute(idAdmin: string): Promise<void> {
    const adminExists = await this.adminRepository.selectOne({ id: idAdmin });

    if (!adminExists) throw new EntityNotFoundError(Entities.ADMIN);

    await this.adminRepository.delete({ id: idAdmin });
  }
}
