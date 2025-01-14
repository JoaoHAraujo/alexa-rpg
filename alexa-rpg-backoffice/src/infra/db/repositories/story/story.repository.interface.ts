import { TStoryModel } from '@src/domain/models';
import { FindOptionsWhere } from 'typeorm';

import { StoryEntity } from '../../entities';
import { AttributeOptions } from '../attribute-selector';

export type TOptions = { attributes?: AttributeOptions; relations?: string[] };

export interface StoryRepositoryInterface {
  selectOne(where: FindOptionsWhere<StoryEntity>, options?: TOptions): Promise<TStoryModel | null>;
  create(data: Partial<TStoryModel>, attributes?: AttributeOptions): Promise<TStoryModel>;
  selectRandom(idAmazon: string, limit: number, where: FindOptionsWhere<StoryEntity>): Promise<TStoryModel[]>;
  update(id: string, data: Partial<TStoryModel>): Promise<TStoryModel>;
  delete(id: string): Promise<void>;
}
