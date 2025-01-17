import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';
import { BaseHttpController, interfaces } from 'inversify-express-utils';
import { Body, Post, Route, Tags } from 'tsoa';

import { ILoginUseCase, TLoginInput, TLoginOutput } from '../../domain/usecases';

@Route('v1/auth')
@Tags('Auth')
@provideSingleton(AuthController)
export class AuthController extends BaseHttpController implements interfaces.Controller {
  constructor(
    @inject(TYPES.usecases.LoginUseCase)
    private readonly loginUseCase: ILoginUseCase,
  ) {
    super();
  }

  @Post('/login')
  async login(@Body() body: TLoginInput): Promise<TLoginOutput> {
    const result = await this.loginUseCase.execute(body);

    return result;
  }
}
