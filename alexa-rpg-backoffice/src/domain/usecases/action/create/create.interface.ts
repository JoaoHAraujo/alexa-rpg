import { TActionModel, TCreateActionInput } from '@src/domain/models';

export interface ICreateActionUseCase {
  execute(data: TCreateActionInput): Promise<TActionModel>;
}
