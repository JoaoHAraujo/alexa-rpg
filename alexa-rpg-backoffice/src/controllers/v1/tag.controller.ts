import { ISelectTagPaginationUseCase } from '@src/domain/usecases/tag/select-pagination';
import { InvalidParamError } from '@src/errors';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';
import { BaseHttpController, interfaces } from 'inversify-express-utils';
import { Get, Middlewares, Path, Query, Route, Tags } from 'tsoa';

import { TTagModel } from '../../domain/models';
import { TagTypes } from '../../enums';
import { TPagination } from '../../utils/interfaces/pagination';
import { authorize } from '../middlewares/authorize.middleware';

@Route('v1/tag')
@Tags('Tag')
@provideSingleton(TagController)
export class TagController extends BaseHttpController implements interfaces.Controller {
  constructor(
    @inject(TYPES.usecases.SelectTagPaginationUseCase)
    private readonly selectTagPaginationUseCase: ISelectTagPaginationUseCase,
  ) {
    super();
  }

  @Get('/:idStory')
  @Middlewares(authorize)
  async selectPagination(
    @Path('idStory') idStory: string,
    @Query('name') name?: string,
    @Query('type') type?: TagTypes,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 30,
    @Query('orderBy') orderBy?: 'name' | 'type' | 'createdAt',
    @Query('isDesc') isDesc?: 'true' | 'false',
  ): Promise<TPagination<TTagModel>> {
    if ((orderBy && !isDesc) || (!orderBy && isDesc)) {
      throw new InvalidParamError('orderBy and isDesc params should be used together');
    }

    const response = await this.selectTagPaginationUseCase.execute(
      idStory,
      {
        ...(name && { name }),
        ...(type && { type }),
      },
      {
        page,
        pageSize,
        ...(orderBy && isDesc && { order: { orderBy, isDesc } }),
      },
    );

    return response;
  }
}
