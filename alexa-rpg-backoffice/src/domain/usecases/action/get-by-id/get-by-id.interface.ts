import { TActionModel } from '@src/domain/models';

export interface IGetActionByIdUseCase {
  execute(idAction: string): Promise<TActionModel | null>;
}
