import { TStoryModel } from '@src/domain/models';
import { provideSingleton } from '@src/utils/provide-singleton';
import { FindOptionsWhere, Repository } from 'typeorm';

import { DatabaseProvider } from '../../config/database';
import { StoryEntity } from '../../entities';
import { AttributeOptions, attributeSelector } from '../attribute-selector';
import { StoryRepositoryInterface, TOptions } from './story.repository.interface';

@provideSingleton(StoryRepository)
export class StoryRepository implements StoryRepositoryInterface {
  private readonly repository: Repository<StoryEntity>;

  constructor() {
    this.repository = DatabaseProvider.getRepository(StoryEntity);
  }

  async selectOne(where: FindOptionsWhere<StoryEntity>, options?: TOptions): Promise<TStoryModel | null> {
    const timestamps = !!options?.attributes?.timestamps;

    const result = await this.repository.findOne({
      where,
      ...(options?.relations && { relations: options?.relations }),
      select: attributeSelector(this.repository, { timestamps }),
    });

    return result?.toModel() ?? null;
  }

  async create(data: Partial<TStoryModel>, attributes?: AttributeOptions): Promise<TStoryModel> {
    const entity = this.repository.create(data);

    const { id } = await this.repository.save(entity);

    const result = await this.selectOne({ id }, { attributes });

    return result!;
  }

  async selectRandom(limit: number, where: FindOptionsWhere<StoryEntity>): Promise<TStoryModel[]> {
    const result = await this.repository.createQueryBuilder().where(where).orderBy('RANDOM()').take(limit).getMany();

    return result.map((story) => story.toModel());
  }

  async update(id: string, data: Partial<TStoryModel>): Promise<TStoryModel> {
    await this.repository.update({ id }, data);

    const result = (await this.repository.findOne({ where: { id } }))!;

    return result.toModel();
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
