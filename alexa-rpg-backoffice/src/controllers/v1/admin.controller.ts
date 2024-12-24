import { IDeleteAdminUseCase, IUpdateAdminUseCase } from '@src/domain/usecases';
import { ICreateAdminUseCase } from '@src/domain/usecases/admin/create';
import { IGetAdminByIdUseCase } from '@src/domain/usecases/admin/get-by-id';
import { ICustomRequest } from '@src/utils/interfaces/custom-request';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';
import { BaseHttpController, interfaces } from 'inversify-express-utils';
import { Body, Delete, Get, Path, Post, Put, Request, Route, Tags } from 'tsoa';

import { TAdminModel, TCreateAdminInput, TUpdateAdminInput } from '../../domain/models';

@Route('v1/admin')
@Tags('Admin')
@provideSingleton(AdminController)
export class AdminController extends BaseHttpController implements interfaces.Controller {
  constructor(
    @inject(TYPES.usecases.CreateAdminUseCase) private readonly createAdminUseCase: ICreateAdminUseCase,
    @inject(TYPES.usecases.GetAdminByIdUseCase) private readonly getAdminByIdUseCase: IGetAdminByIdUseCase,
    @inject(TYPES.usecases.DeleteAdminUseCase) private readonly deleteAdminUseCase: IDeleteAdminUseCase,
    @inject(TYPES.usecases.UpdateAdminUseCase) private readonly updateAdminUseCase: IUpdateAdminUseCase,
  ) {
    super();
  }

  // TODO authentication ADMIN and DEVICE
  @Post()
  async create(@Body() body: TCreateAdminInput, @Request() _req: ICustomRequest): Promise<TAdminModel | null> {
    const result = await this.createAdminUseCase.execute(body);

    return result;
  }

  @Get('/:idAdmin')
  async getById(@Path('idAdmin') idAdmin: string, @Request() _req: ICustomRequest): Promise<TAdminModel | null> {
    const result = await this.getAdminByIdUseCase.execute(idAdmin);

    return result;
  }

  @Delete('/:idAdmin')
  async deleteById(@Path('idAdmin') idAdmin: string, @Request() _req: ICustomRequest): Promise<boolean> {
    await this.deleteAdminUseCase.execute(idAdmin);

    return true;
  }

  @Put('/:idAdmin')
  async update(
    @Path('idAdmin') idAdmin: string,
    @Body() body: TUpdateAdminInput,
    @Request() _req: ICustomRequest,
  ): Promise<TAdminModel> {
    const result = await this.updateAdminUseCase.execute(idAdmin, body);

    return result;
  }
}
