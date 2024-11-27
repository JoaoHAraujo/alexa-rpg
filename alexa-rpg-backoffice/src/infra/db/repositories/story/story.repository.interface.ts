import { StoryModel } from '@src/domain/models';
import { FindOptionsWhere } from 'typeorm';

import { StoryEntity } from '../../entities';
import { AttributeOptions } from '../attribute-selector';

export interface StoryRepositoryInterface {
  selectOne(where: FindOptionsWhere<StoryEntity>, options?: AttributeOptions): Promise<StoryModel | null>;
  create(data: Omit<StoryModel, 'id'>, options?: AttributeOptions): Promise<StoryModel>;
  selectRandom(limit: number, where: FindOptionsWhere<StoryEntity>): Promise<StoryModel[]>;
  delete(id: string): Promise<void>;
}
