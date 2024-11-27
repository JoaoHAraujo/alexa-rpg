import { ICreateStoryUseCase, IGetRandomStoriesUseCase, IGetStoryByIdUseCase } from '@src/domain/usecases';
import { IDeleteStoryUseCase } from '@src/domain/usecases/story/delete';
import { IUpdateStoryUseCase } from '@src/domain/usecases/story/update';
import { InvalidParamError } from '@src/errors';
import { ICustomRequest } from '@src/utils/interfaces/custom-request';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';
import { BaseHttpController, interfaces } from 'inversify-express-utils';
import { Body, Delete, Get, Path, Post, Put, Query, Request, Route, Tags } from 'tsoa';
import { validate } from 'uuid';

import { TStoryModel, TStoryModelInput, TUpdateStoryInput } from '../../domain/models';

@Route('v1/story')
@Tags('Story')
@provideSingleton(StoryController)
export class StoryController extends BaseHttpController implements interfaces.Controller {
  constructor(
    @inject(TYPES.usecases.CreateStoryUseCase)
    private readonly createStoryUseCase: ICreateStoryUseCase,
    @inject(TYPES.usecases.GetStoryByIdUseCase)
    private readonly getStoryByIdUseCase: IGetStoryByIdUseCase,
    @inject(TYPES.usecases.GetRandomStoriesUseCase)
    private readonly getRandomStoriesUseCase: IGetRandomStoriesUseCase,
    @inject(TYPES.usecases.DeleteStoryUseCase)
    private readonly deleteStoryUseCase: IDeleteStoryUseCase,
    @inject(TYPES.usecases.UpdateStoryUseCase)
    private readonly updateStoryUseCase: IUpdateStoryUseCase,
  ) {
    super();
  }

  // TODO authentication ADMIN e DEVICE
  @Post()
  async create(@Body() httpRequest: TStoryModelInput, @Request() _req: ICustomRequest): Promise<TStoryModel> {
    const result = await this.createStoryUseCase.create(httpRequest);

    return result;
  }

  @Get('/random')
  async getRandom(@Query('limit') limit = 5): Promise<TStoryModel[]> {
    const response = await this.getRandomStoriesUseCase.getRandom(limit);

    return response;
  }

  @Get('/:idStory')
  async getById(@Path('idStory') idStory: string): Promise<TStoryModel> {
    if (!idStory || !validate(idStory)) throw new InvalidParamError('idStory');

    const result = await this.getStoryByIdUseCase.getById(idStory);

    return result;
  }

  @Put('/:idStory')
  async updateStory(@Path('idStory') idStory: string, @Body() input: TUpdateStoryInput): Promise<TStoryModel> {
    const result = await this.updateStoryUseCase.execute(idStory, input);

    return result;
  }

  @Delete('/:idStory')
  async deleteById(@Path('idStory') idStory: string): Promise<boolean> {
    await this.deleteStoryUseCase.execute(idStory);

    return true;
  }
}
