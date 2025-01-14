import { ICreateStoryUseCase, IGetRandomStoriesUseCase, IGetStoryByIdUseCase } from '@src/domain/usecases';
import { IDeleteStoryUseCase } from '@src/domain/usecases/story/delete';
import { IUpdateStoryUseCase } from '@src/domain/usecases/story/update';
import { InvalidParamError } from '@src/errors';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';
import { BaseHttpController, interfaces } from 'inversify-express-utils';
import { Body, Delete, Get, Middlewares, Path, Post, Put, Query, Route, Tags } from 'tsoa';
import { validate } from 'uuid';

import { TCreateStoryInput, TStoryModel, TUpdateStoryInput } from '../../domain/models';
import { TGetStoryByIdResponse } from '../../domain/usecases/story/get-by-id/get-by-id.interface';
import { authorize } from '../middlewares/authorize.middleware';

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

  @Post()
  @Middlewares(authorize)
  async create(@Body() httpRequest: TCreateStoryInput): Promise<TStoryModel> {
    const result = await this.createStoryUseCase.create(httpRequest);

    return result;
  }

  @Get('/random')
  @Middlewares(authorize)
  async getRandom(@Query('limit') limit = 5, @Query('age') age: number): Promise<TStoryModel[]> {
    const response = await this.getRandomStoriesUseCase.getRandom(age, limit);

    return response;
  }

  @Get('/:idStory')
  @Middlewares(authorize)
  async getById(@Path('idStory') idStory: string): Promise<TGetStoryByIdResponse> {
    if (!idStory || !validate(idStory)) throw new InvalidParamError('idStory');

    const result = await this.getStoryByIdUseCase.getById(idStory);

    return result;
  }

  @Put('/:idStory')
  @Middlewares(authorize)
  async updateStory(@Path('idStory') idStory: string, @Body() input: TUpdateStoryInput): Promise<TStoryModel> {
    const result = await this.updateStoryUseCase.execute(idStory, input);

    return result;
  }

  @Delete('/:idStory')
  @Middlewares(authorize)
  async deleteById(@Path('idStory') idStory: string): Promise<boolean> {
    await this.deleteStoryUseCase.execute(idStory);

    return true;
  }
}
