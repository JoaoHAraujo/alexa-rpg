import {
  IDeleteSegmentUseCase,
  IGetSegmentByIdUseCase,
  IMakeSegmentFirstUseCase,
  ISelectSegmentPaginationUseCase,
} from '@src/domain/usecases';
import { ICreateSegmentUseCase } from '@src/domain/usecases/segment/create';
import { IUpdateSegmentUseCase } from '@src/domain/usecases/segment/update';
import { InvalidParamError } from '@src/errors';
import { ICustomRequest } from '@src/utils/interfaces/custom-request';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';
import { BaseHttpController, interfaces } from 'inversify-express-utils';
import { Body, Delete, Get, Patch, Path, Post, Put, Query, Request, Route, Tags } from 'tsoa';

import { TCreateSegmentInput, TSegmentModel, TUpdateSegmentInput } from '../../domain/models';
import { TPagination } from '../../utils/interfaces/pagination';

@Route('v1/segment')
@Tags('Segment')
@provideSingleton(SegmentController)
export class SegmentController extends BaseHttpController implements interfaces.Controller {
  constructor(
    @inject(TYPES.usecases.CreateSegmentUseCase)
    private readonly createSegmentUseCase: ICreateSegmentUseCase,
    @inject(TYPES.usecases.DeleteSegmentUseCase)
    private readonly deleteSegmentUseCase: IDeleteSegmentUseCase,
    @inject(TYPES.usecases.GetSegmentByIdUseCase)
    private readonly getSegmentByIdUseCase: IGetSegmentByIdUseCase,
    @inject(TYPES.usecases.UpdateSegmentUseCase)
    private readonly updateSegmentUseCase: IUpdateSegmentUseCase,
    @inject(TYPES.usecases.MakeSegmentFirstUseCase)
    private readonly makeFirstSegmentUseCase: IMakeSegmentFirstUseCase,
    @inject(TYPES.usecases.SelectSegmentPaginationUseCase)
    private readonly selectSegmentPaginationUseCase: ISelectSegmentPaginationUseCase,
  ) {
    super();
  }

  // TODO authentication ADMIN and DEVICE
  @Get('/:idSegment')
  async getById(@Path('idSegment') idSegment: string): Promise<TSegmentModel | null> {
    const result = await this.getSegmentByIdUseCase.execute(idSegment);

    return result;
  }

  @Get('/all/:idStory')
  async getAllPaginated(
    @Path('idStory') idStory: string,
    @Request() _req: string,
    @Query('narrative') narrative?: string,
    @Query('tags') tags?: string,
    @Query('isFirst') isFirst?: boolean,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 30,
    @Query('orderBy') orderBy?: 'narrative',
    @Query('isDesc') isDesc?: 'true' | 'false',
  ): Promise<TPagination<TSegmentModel>> {
    if ((orderBy && !isDesc) || (!orderBy && isDesc)) {
      throw new InvalidParamError('orderBy and isDesc params should be used together');
    }

    const formattedTags = tags?.split(';');

    const response = await this.selectSegmentPaginationUseCase.execute(
      idStory,
      {
        ...(narrative && { narrative }),
        ...(formattedTags?.length && { tags: formattedTags }),
        ...(typeof isFirst === 'boolean' && { isFirst }),
      },
      { page, pageSize, ...(orderBy && isDesc && { order: { orderBy, isDesc } }) },
    );

    return response;
  }

  @Post()
  async create(@Body() body: TCreateSegmentInput, @Request() _req: ICustomRequest): Promise<TSegmentModel> {
    const result = await this.createSegmentUseCase.execute(body);

    return result;
  }

  @Put('/:idSegment')
  async update(
    @Path('idSegment') idSegment: string,
    @Body() body: TUpdateSegmentInput,
    @Request() _req: ICustomRequest,
  ): Promise<TSegmentModel> {
    const response = await this.updateSegmentUseCase.execute(idSegment, body);

    return response;
  }

  @Patch('/:idSegment')
  async makeFirstSegment(@Path('idSegment') idSegment: string): Promise<boolean> {
    await this.makeFirstSegmentUseCase.execute(idSegment);

    return true;
  }

  @Delete('/:idSegment')
  async delete(@Path('idSegment') idSegment: string, @Request() _req: ICustomRequest): Promise<boolean> {
    await this.deleteSegmentUseCase.execute(idSegment);

    return true;
  }
}
