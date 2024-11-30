import { IDeleteSegmentUseCase, IGetSegmentByIdUseCase } from '@src/domain/usecases';
import { ICreateSegmentUseCase } from '@src/domain/usecases/segment/create';
import { ICustomRequest } from '@src/utils/interfaces/custom-request';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';
import { BaseHttpController, interfaces } from 'inversify-express-utils';
import { Body, Delete, Get, Path, Post, Request, Route, Tags } from 'tsoa';

import { TCreateSegmentInput, TSegmentModel } from '../../domain/models';

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
  ) {
    super();
  }

  // TODO authentication ADMIN and DEVICE
  @Get('/:idSegment')
  async getById(@Path('idSegment') idSegment: string): Promise<TSegmentModel | null> {
    const result = await this.getSegmentByIdUseCase.execute(idSegment);

    return result;
  }

  @Post()
  async create(@Body() body: TCreateSegmentInput, @Request() _req: ICustomRequest): Promise<TSegmentModel> {
    const result = await this.createSegmentUseCase.execute(body);

    return result;
  }

  @Delete('/:idSegment')
  async delete(@Path('idSegment') idSegment: string, @Request() _req: ICustomRequest): Promise<boolean> {
    await this.deleteSegmentUseCase.execute(idSegment);

    return true;
  }
}
