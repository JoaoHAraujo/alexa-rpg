import { TStoryModel, TCreateStoryInput } from '@src/domain/models';

export interface ICreateStoryUseCase {
  create(data: TCreateStoryInput): Promise<TStoryModel>;
}
