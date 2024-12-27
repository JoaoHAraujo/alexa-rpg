import { CryptoAdapter } from '@src/adapters/crypto.adapter';
import { TAdminModel, TCreateAdminInput } from '@src/domain/models';
import { Entities } from '@src/enums';
import { EntityAlreadyExistsError } from '@src/errors';
import { validatePasswordFormat } from '@src/helpers/validate-password-format';
import { AdminRepositoryInterface } from '@src/infra/db/repositories/admin';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';

import { ICreateAdminUseCase } from './create.interface';

@provideSingleton(CreateAdminUseCase)
export class CreateAdminUseCase implements ICreateAdminUseCase {
  constructor(
    @inject(TYPES.adapters.CryptoAdapter)
    private readonly cryptoAdapter: CryptoAdapter,
    @inject(TYPES.repositories.AdminRepository)
    private readonly adminRepository: AdminRepositoryInterface,
  ) {}

  async execute(input: TCreateAdminInput): Promise<TAdminModel> {
    validatePasswordFormat(input.password);

    const adminExists = await this.adminRepository.selectOne(
      { email: input.email },
      { attributes: { password: true, timestamps: false } },
    );

    if (adminExists) {
      throw new EntityAlreadyExistsError(Entities.ADMIN);
    }

    const adminCreated = await this.adminRepository.create({
      ...input,
      password: this.cryptoAdapter.generateHash(input.password),
    });

    return adminCreated;
  }
}
