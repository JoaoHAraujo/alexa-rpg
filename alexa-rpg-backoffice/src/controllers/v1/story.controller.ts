import { ICreateStoryUseCase } from '@src/domain/usecases';
import { ICustomRequest } from '@src/utils/interfaces/custom-request';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';
import { BaseHttpController, interfaces } from 'inversify-express-utils';
import { Body, Post, Request, Route, Tags } from 'tsoa';

import { StoryModel } from '../../domain/models';

@Route('v1/story')
@Tags('Story')
@provideSingleton(StoryController)
export class StoryController extends BaseHttpController implements interfaces.Controller {
  constructor(
    @inject(TYPES.usecases.CreateStoryUseCase)
    private readonly createStoryUseCase: ICreateStoryUseCase,
  ) {
    super();
  }

  @Post()
  async create(
    @Body() httpRequest: Omit<StoryModel, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
    @Request() _req: ICustomRequest,
  ): Promise<StoryModel> {
    const result = await this.createStoryUseCase.create(httpRequest);

    return result;
  }
}
