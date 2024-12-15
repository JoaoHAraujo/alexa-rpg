import { TTagModel } from '@src/domain/models';
import { formatPagination, makePagination, TPaginationParams } from '@src/utils/pagination';
import { provideSingleton } from '@src/utils/provide-singleton';
import { FindOptionsWhere, Repository } from 'typeorm';

import { TPagination } from '../../../../utils/interfaces/pagination';
import { DatabaseProvider } from '../../config/database';
import { TagEntity } from '../../entities';
import { attributeSelector } from '../attribute-selector';
import { TagRepositoryInterface, TOptions } from './tag.interface';

@provideSingleton(TagRepository)
export class TagRepository implements TagRepositoryInterface {
  private readonly repository: Repository<TagEntity>;

  constructor() {
    this.repository = DatabaseProvider.getRepository(TagEntity);
  }

  async selectPagination(
    where: FindOptionsWhere<TagEntity>,
    paginationParams: TPaginationParams<TagEntity>,
    options?: TOptions,
  ): Promise<TPagination<TTagModel>> {
    const timestamps = !!options?.attributes?.timestamps;

    const [rows, totalRows] = await Promise.all([
      this.repository.find({
        where,
        select: attributeSelector(this.repository, { timestamps }),
        ...(options?.relations?.length && { relations: options.relations }),
        ...makePagination(paginationParams),
      }),
      this.repository.count({ where }),
    ]);

    return formatPagination({
      totalRows,
      currentPage: paginationParams.page,
      pageSize: paginationParams.pageSize,
      rows: rows.map((i) => i.toModel()),
    });
  }

  async selectOne(where: FindOptionsWhere<TagEntity>, options?: TOptions): Promise<TTagModel | null> {
    const timestamps = !!options?.attributes?.timestamps;

    const result = await this.repository.findOne({
      where,
      ...(options?.relations && { relations: options?.relations }),
      select: attributeSelector(this.repository, { timestamps }),
    });

    return result?.toModel() ?? null;
  }

  async selectMany(where: FindOptionsWhere<TagEntity>, options?: TOptions): Promise<TTagModel[]> {
    const timestamps = !!options?.attributes?.timestamps;

    const result = await this.repository.find({
      where,
      select: attributeSelector(this.repository, { timestamps }),
      ...(options?.relations?.length && { relations: options.relations }),
    });

    return result.map((i) => i.toModel());
  }

  async bulkCreate(data: Array<Partial<TTagModel>>): Promise<TTagModel[]> {
    const entities = this.repository.create(data);

    const actionsSaved = await this.repository.save(entities);

    return actionsSaved.map((action) => action.toModel());
  }
}
