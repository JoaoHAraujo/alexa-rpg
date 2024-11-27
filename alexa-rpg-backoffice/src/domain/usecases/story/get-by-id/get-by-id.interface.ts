import { TStoryModel } from '@src/domain/models';

export interface IGetStoryByIdUseCase {
  getById(idStory: string): Promise<TStoryModel>;
}
