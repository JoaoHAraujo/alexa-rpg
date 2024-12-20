import { TAdminModel, TCreateAdminInput } from '@src/domain/models';

export interface ICreateAdminUseCase {
  execute(input: TCreateAdminInput): Promise<TAdminModel>;
}
