import { TActionModel } from '@src/domain/models';
import { provideSingleton } from '@src/utils/provide-singleton';
import { FindOptionsWhere, Repository } from 'typeorm';

import { DatabaseProvider } from '../../config/database';
import { ActionEntity } from '../../entities';
import { AttributeOptions, attributeSelector } from '../attribute-selector';
import { ActionRepositoryInterface, TOptions } from './action.interface';

@provideSingleton(ActionRepository)
export class ActionRepository implements ActionRepositoryInterface {
  private readonly repository: Repository<ActionEntity>;

  constructor() {
    this.repository = DatabaseProvider.getRepository(ActionEntity);
  }

  async selectMany(where: FindOptionsWhere<ActionEntity>, options?: TOptions): Promise<TActionModel[]> {
    const timestamps = !!options?.attributes?.timestamps;

    const result = await this.repository.find({
      where,
      select: attributeSelector(this.repository, { timestamps }),
      ...(options?.relations?.length && { relations: options.relations }),
    });

    return result.map((i) => i.toModel());
  }

  async selectOne(where: FindOptionsWhere<ActionEntity>, options?: TOptions): Promise<TActionModel | null> {
    const timestamps = !!options?.attributes?.timestamps;

    const result = await this.repository.findOne({
      where,
      select: attributeSelector(this.repository, { timestamps }),
      ...(options?.relations?.length && { relations: options.relations }),
    });

    return result?.toModel() ?? null;
  }

  async create(data: Partial<TActionModel>, attributes?: AttributeOptions): Promise<TActionModel> {
    const entity = this.repository.create(data);

    const { id } = await this.repository.save(entity);

    const result = await this.selectOne({ id }, { attributes });

    return result!;
  }

  async bulkCreate(data: Array<Partial<TActionModel>>): Promise<TActionModel[]> {
    const entities = this.repository.create(data);

    const actionsSaved = await this.repository.save(entities);

    return actionsSaved.map((action) => action.toModel());
  }

  async count(where: FindOptionsWhere<ActionEntity>): Promise<number> {
    return this.repository.count({ where });
  }

  async update(id: string, data: Partial<TActionModel>): Promise<TActionModel | null> {
    await this.repository.update({ id }, data);

    const result = await this.selectOne({ id });

    return result;
  }

  async delete(where: FindOptionsWhere<ActionEntity>): Promise<void> {
    await this.repository.softDelete(where);
  }
}
