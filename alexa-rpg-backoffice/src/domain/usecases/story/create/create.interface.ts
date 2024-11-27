import { TStoryModel, TStoryModelInput } from '@src/domain/models';

export interface ICreateStoryUseCase {
  create(data: TStoryModelInput): Promise<TStoryModel>;
}
