import { TUserProgressModel } from '@src/domain/models';
import { provideSingleton } from '@src/utils/provide-singleton';
import { FindOptionsWhere, Repository } from 'typeorm';

import { DatabaseProvider } from '../../config/database';
import { UserProgressEntity } from '../../entities';
import { attributeSelector } from '../attribute-selector';
import { TOptions, UserProgressRepositoryInterface } from './user-progress.interface';

@provideSingleton(UserProgressRepository)
export class UserProgressRepository implements UserProgressRepositoryInterface {
  private readonly repository: Repository<UserProgressEntity>;

  constructor() {
    this.repository = DatabaseProvider.getRepository(UserProgressEntity);
  }

  async selectOne(where: FindOptionsWhere<UserProgressEntity>, options?: TOptions): Promise<TUserProgressModel | null> {
    const timestamps = !!options?.attributes?.timestamps;

    const result = await this.repository.findOne({
      where,
      ...(options?.relations && { relations: options?.relations }),
      select: attributeSelector(this.repository, { timestamps }),
    });

    return result?.toModel() ?? null;
  }

  async selectMany(where: FindOptionsWhere<UserProgressEntity>, options?: TOptions): Promise<TUserProgressModel[]> {
    const timestamps = !!options?.attributes?.timestamps;

    const result = await this.repository.find({
      where,
      ...(options?.relations && { relations: options?.relations }),
      select: attributeSelector(this.repository, { timestamps }),
    });

    return result.map((i) => i.toModel());
  }

  async update(id: string, data: Partial<TUserProgressModel>): Promise<TUserProgressModel> {
    await this.repository.update({ id }, data);

    const result = (await this.repository.findOne({ where: { id } }))!;

    return result.toModel();
  }

  async create(data: Partial<TUserProgressModel>): Promise<TUserProgressModel> {
    const entity = this.repository.create(data);

    const { id } = await this.repository.save(entity);

    const result = await this.selectOne({ id });

    return result!;
  }
}
