import { TAdminModel, TUpdateAdminInput } from '@src/domain/models';

export interface IUpdateAdminUseCase {
  execute(idAdmin: string, input: TUpdateAdminInput): Promise<TAdminModel>;
}
