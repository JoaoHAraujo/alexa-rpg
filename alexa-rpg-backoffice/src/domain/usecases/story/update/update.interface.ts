import { TStoryModel, TUpdateStoryInput } from '@src/domain/models';

export interface IUpdateStoryUseCase {
  execute(id: string, input: TUpdateStoryInput): Promise<TStoryModel>;
}
