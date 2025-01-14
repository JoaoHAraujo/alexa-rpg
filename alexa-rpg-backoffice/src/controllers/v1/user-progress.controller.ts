import { ISelectUserProgressesUseCase } from '@src/domain/usecases/user-progress/select-user-progresses';
import { InvalidParamError } from '@src/errors';
import { ICustomRequest } from '@src/utils/interfaces/custom-request';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';
import { BaseHttpController, interfaces } from 'inversify-express-utils';
import { Body, Get, Middlewares, Path, Put, Query, Request, Route, Tags } from 'tsoa';

import { TUserProgressModel } from '../../domain/models';
import { IUpsertUserProgressUseCase, TUpsertUserProgressInput } from '../../domain/usecases';
import { authorize } from '../middlewares/authorize.middleware';

type TUpsertPayload = Pick<TUpsertUserProgressInput, 'idNewSegment' | 'idStory'>;

@Route('v1/user-progress')
@Tags('UserProgress')
@provideSingleton(UserProgressController)
export class UserProgressController extends BaseHttpController implements interfaces.Controller {
  constructor(
    @inject(TYPES.usecases.SelectUserProgressesUseCase)
    private readonly selectUserProgressesUseCase: ISelectUserProgressesUseCase,
    @inject(TYPES.usecases.UpsertUserProgressUseCase)
    private readonly upsertUserProgressUseCase: IUpsertUserProgressUseCase,
  ) {
    super();
  }

  @Get('/all')
  @Middlewares(authorize)
  async selectAll(@Request() req: ICustomRequest, @Query('age') age: number): Promise<TUserProgressModel[]> {
    const result = await this.selectUserProgressesUseCase.execute(req.user.idAmazon as string, age);

    return result;
  }

  @Put()
  @Middlewares(authorize)
  async updateProgress(@Body() body: TUpsertPayload, @Request() req: ICustomRequest): Promise<TUserProgressModel> {
    const { idAmazon } = req.user;
    const { idNewSegment, idStory } = body;

    if (!idAmazon) throw new InvalidParamError('idAmazon');

    const result = await this.upsertUserProgressUseCase.execute({ idAmazon, idStory, idNewSegment });

    return result;
  }
}
