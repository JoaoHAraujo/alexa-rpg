import { TAdminModel } from '@src/domain/models';

export interface IGetAdminByIdUseCase {
  execute(idAdmin: string): Promise<TAdminModel | null>;
}
