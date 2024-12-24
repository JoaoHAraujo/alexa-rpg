import { CryptoAdapter } from '@src/adapters/crypto.adapter';
import { JwtAdapter } from '@src/adapters/jwt-adapter';
import { UnauthorizedError } from '@src/errors';
import { AdminRepositoryInterface } from '@src/infra/db/repositories';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';

import { ILoginUseCase, TLoginInput } from './login.interface';

@provideSingleton(LoginUseCase)
export class LoginUseCase implements ILoginUseCase {
  constructor(
    @inject(TYPES.repositories.AdminRepository)
    private readonly adminRepository: AdminRepositoryInterface,
    @inject(TYPES.adapters.CryptoAdapter)
    private readonly cryptoAdapter: CryptoAdapter,
    @inject(TYPES.adapters.JwtAdapter)
    private readonly jwtAdapter: JwtAdapter,
  ) {}

  async execute(input: TLoginInput): Promise<string> {
    const { email, password } = input;

    const adminExists = await this.adminRepository.selectOne(
      { email },
      { attributes: { password: true, timestamps: false } },
    );

    if (!adminExists) throw new UnauthorizedError();

    const passwordMatches = this.cryptoAdapter.validateHash(password, adminExists.password);

    if (!passwordMatches) throw new UnauthorizedError();

    const token = this.jwtAdapter.createToken({ idUser: adminExists.id });

    return token;
  }
}
