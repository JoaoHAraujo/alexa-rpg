import { ISelectUserProgressesUseCase } from '@src/domain/usecases/user-progress/select-user-progresses';
import { ICustomRequest } from '@src/utils/interfaces/custom-request';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';
import { BaseHttpController, interfaces } from 'inversify-express-utils';
import { Get, Middlewares, Query, Request, Route, Tags } from 'tsoa';

import { TUserProgressModel } from '../../domain/models';
import { authorize } from '../middlewares/authorize.middleware';

@Route('v1/user-progress')
@Tags('UserProgress')
@provideSingleton(UserProgressController)
export class UserProgressController extends BaseHttpController implements interfaces.Controller {
  constructor(
    @inject(TYPES.usecases.SelectUserProgressesUseCase)
    private readonly selectUserProgressesUseCase: ISelectUserProgressesUseCase,
  ) {
    super();
  }

  @Get('/all')
  @Middlewares(authorize)
  async selectAll(@Request() req: ICustomRequest, @Query('age') age: number): Promise<TUserProgressModel[]> {
    const result = await this.selectUserProgressesUseCase.execute(req.user.idAmazon as string, age);

    return result;
  }
}
