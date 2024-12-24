import { TAdminModel, TUpdateAdminInput } from '@src/domain/models';
import { Entities } from '@src/enums';
import { EntityNotFoundError } from '@src/errors';
import { AdminRepositoryInterface } from '@src/infra/db/repositories';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';

import { IUpdateAdminUseCase } from './update.interface';

@provideSingleton(UpdateAdminUseCase)
export class UpdateAdminUseCase implements IUpdateAdminUseCase {
  constructor(
    @inject(TYPES.repositories.AdminRepository)
    private readonly adminRepository: AdminRepositoryInterface,
  ) {}

  async execute(idAdmin: string, input: TUpdateAdminInput): Promise<TAdminModel> {
    const adminExists = await this.adminRepository.selectOne({ id: idAdmin });

    if (!adminExists) throw new EntityNotFoundError(Entities.ADMIN);

    const updatedAdmin = await this.adminRepository.update(idAdmin, {
      ...(input.email && { email: input.email }),
      ...(input.name && { name: input.name }),
    });

    return updatedAdmin;
  }
}
