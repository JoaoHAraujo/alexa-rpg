import { TStoryModel } from '@src/domain/models';
import { FindOptionsWhere } from 'typeorm';

import { StoryEntity } from '../../entities';
import { AttributeOptions } from '../attribute-selector';

export interface StoryRepositoryInterface {
  selectOne(where: FindOptionsWhere<StoryEntity>, options?: AttributeOptions): Promise<TStoryModel | null>;
  create(data: Partial<TStoryModel>, options?: AttributeOptions): Promise<TStoryModel>;
  selectRandom(limit: number, where: FindOptionsWhere<StoryEntity>): Promise<TStoryModel[]>;
  update(id: string, data: Partial<TStoryModel>): Promise<TStoryModel>;
  delete(id: string): Promise<void>;
}
