import { TActionModel, TCreateActionInput } from '@src/domain/models';

export interface ICreateBulkActionUseCase {
  execute(data: TCreateActionInput): Promise<TActionModel[]>;
}
