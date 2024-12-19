import { IGetSegmentActionsUseCase } from '@src/domain/usecases';
import { ICreateActionUseCase } from '@src/domain/usecases/action/create/create.interface';
import { IUpdateActionUseCase } from '@src/domain/usecases/action/update';
import { ICustomRequest } from '@src/utils/interfaces/custom-request';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';
import { BaseHttpController, interfaces } from 'inversify-express-utils';
import { Body, Get, Path, Post, Put, Request, Route, Tags } from 'tsoa';

import { TActionModel, TCreateActionInput, TUpdateActionInput } from '../../domain/models';

@Route('v1/action')
@Tags('Action')
@provideSingleton(ActionController)
export class ActionController extends BaseHttpController implements interfaces.Controller {
  constructor(
    @inject(TYPES.usecases.CreateActionUseCase)
    private readonly createActionUseCase: ICreateActionUseCase,
    @inject(TYPES.usecases.GetSegmentActionsUseCase)
    private readonly getSegmentActionsUseCase: IGetSegmentActionsUseCase,
    @inject(TYPES.usecases.UpdateActionUseCase)
    private readonly updateActionUseCase: IUpdateActionUseCase,
  ) {
    super();
  }

  // TODO authentication ADMIN and DEVICE
  @Post()
  async create(@Body() body: TCreateActionInput, @Request() _req: ICustomRequest): Promise<TActionModel> {
    const result = await this.createActionUseCase.execute(body);

    return result;
  }

  @Get('per-segment/:idSegment')
  async getAction(@Path('idSegment') idSegment: string): Promise<TActionModel[]> {
    const result = await this.getSegmentActionsUseCase.execute(idSegment);

    return result;
  }

  @Put('/:idAction')
  async update(@Path('idAction') idAction: string, @Body() body: TUpdateActionInput): Promise<TActionModel | null> {
    const result = await this.updateActionUseCase.execute(idAction, body);

    return result;
  }
}
