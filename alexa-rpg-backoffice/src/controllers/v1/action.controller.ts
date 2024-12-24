import { ICreateActionUseCase } from '@src/domain/usecases/action/create/create.interface';
import { IGetActionByIdUseCase } from '@src/domain/usecases/action/get-by-id';
import { IUpdateActionUseCase } from '@src/domain/usecases/action/update';
import { InvalidParamError } from '@src/errors';
import { ICustomRequest } from '@src/utils/interfaces/custom-request';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';
import { BaseHttpController, interfaces } from 'inversify-express-utils';
import { Body, Delete, Get, Path, Post, Put, Query, Request, Route, Tags } from 'tsoa';

import { TActionModel, TCreateActionInput, TUpdateActionInput } from '../../domain/models';
import {
  IDeleteActionUseCase,
  IGetSegmentActionsUseCase,
  ISelectActionPaginationUseCase,
  TSuccessRateComparator,
} from '../../domain/usecases';
import { TPagination } from '../../utils/interfaces/pagination';

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
    @inject(TYPES.usecases.GetActionByIdUseCase)
    private readonly getActionByIdUseCase: IGetActionByIdUseCase,
    @inject(TYPES.usecases.DeleteActionUseCase)
    private readonly deleteActionUseCase: IDeleteActionUseCase,
    @inject(TYPES.usecases.SelectActionPaginationUseCase)
    private readonly selectActionPaginationUseCase: ISelectActionPaginationUseCase,
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
  async getAction(@Path('idSegment') idSegment: string, @Request() _req: ICustomRequest): Promise<TActionModel[]> {
    const result = await this.getSegmentActionsUseCase.execute(idSegment);

    return result;
  }

  @Get('/:idAction')
  async getById(@Path('idAction') idAction: string, @Request() _req: ICustomRequest): Promise<TActionModel | null> {
    const result = await this.getActionByIdUseCase.execute(idAction);

    return result;
  }

  @Get('/all/:idStory')
  async getAllPaginated(
    @Path('idStory') idStory: string,
    @Request()
    _req: ICustomRequest,
    @Query('description') description?: string,
    @Query('tags') tags?: string,
    @Query('successRate') successRate?: number,
    @Query('successRateComparator') successRateComparator?: TSuccessRateComparator,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 30,
    @Query('orderBy') orderBy?: 'description' | 'successRate',
    @Query('isDesc') isDesc?: 'true' | 'false',
  ): Promise<TPagination<TActionModel>> {
    if ((orderBy && !isDesc) || (!orderBy && isDesc)) {
      throw new InvalidParamError('orderBy and isDesc params should be used together');
    }

    if (successRateComparator && typeof successRate !== 'number') {
      throw new InvalidParamError('successRateComparator should only be used with successRate param');
    }

    if (successRate && successRate < 0) throw new InvalidParamError('successRate param should be equal 0 or bigger');

    const formattedTags = tags?.split(';');

    const response = await this.selectActionPaginationUseCase.execute(
      idStory,
      {
        ...(description && { description }),
        ...(formattedTags?.length && { tags: formattedTags }),
        ...(successRate && { successRate }),
        ...(successRateComparator && { successRateComparator }),
      },
      { page, pageSize, ...(orderBy && isDesc && { order: { orderBy, isDesc } }) },
    );

    return response;
  }

  @Put('/:idAction')
  async update(
    @Path('idAction') idAction: string,
    @Body() body: TUpdateActionInput,
    @Request() _req: ICustomRequest,
  ): Promise<TActionModel | null> {
    const result = await this.updateActionUseCase.execute(idAction, body);

    return result;
  }

  @Delete('/:idAction')
  async delete(@Path('idAction') idAction: string, @Request() _req: ICustomRequest): Promise<boolean> {
    const result = await this.deleteActionUseCase.execute(idAction);

    return result;
  }
}
