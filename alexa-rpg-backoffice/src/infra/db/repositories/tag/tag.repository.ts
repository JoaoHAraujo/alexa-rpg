import { TTagModel } from '@src/domain/models';
import { TPagination } from '@src/utils/interfaces/pagination';
import { formatPagination, makePagination, TPaginationParams } from '@src/utils/pagination';
import { provideSingleton } from '@src/utils/provide-singleton';
import { FindOptionsWhere, Repository } from 'typeorm';

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
    options: TOptions,
    paginationParams: TPaginationParams<TagEntity>,
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
      currentPage: paginationParams.currentPage,
      pageSize: paginationParams.pageSize,
      rows: rows.map((i) => i.toModel()),
    });
  }
}
