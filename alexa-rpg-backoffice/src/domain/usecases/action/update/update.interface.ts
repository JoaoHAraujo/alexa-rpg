import { TActionModel, TUpdateActionInput } from '@src/domain/models';

export interface IUpdateActionUseCase {
  execute(idAction: string, input: TUpdateActionInput): Promise<TActionModel | null>;
}
