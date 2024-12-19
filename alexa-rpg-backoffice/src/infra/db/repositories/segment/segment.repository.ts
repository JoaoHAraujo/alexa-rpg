import { TSegmentModel } from '@src/domain/models';
import { TPagination } from '@src/utils/interfaces/pagination';
import { formatPagination, makePagination, TPaginationParams } from '@src/utils/pagination';
import { provideSingleton } from '@src/utils/provide-singleton';
import { FindOptionsWhere, Repository } from 'typeorm';

import { DatabaseProvider } from '../../config/database';
import { SegmentEntity } from '../../entities';
import { AttributeOptions, attributeSelector } from '../attribute-selector';
import { SegmentRepositoryInterface, TOptions } from './segment.interface';

@provideSingleton(SegmentRepository)
export class SegmentRepository implements SegmentRepositoryInterface {
  private readonly repository: Repository<SegmentEntity>;

  constructor() {
    this.repository = DatabaseProvider.getRepository(SegmentEntity);
  }

  async selectOne(where: FindOptionsWhere<SegmentEntity>, options?: TOptions): Promise<TSegmentModel | null> {
    const timestamps = !!options?.attributes?.timestamps;

    const result = await this.repository.findOne({
      where,
      select: attributeSelector(this.repository, { timestamps }),
      ...(options?.relations?.length && { relations: options.relations }),
    });

    return result?.toModel() ?? null;
  }

  async selectMany(where: FindOptionsWhere<SegmentEntity>, options?: TOptions): Promise<TSegmentModel[]> {
    const timestamps = !!options?.attributes?.timestamps;

    const result = await this.repository.find({
      where,
      select: attributeSelector(this.repository, { timestamps }),
      ...(options?.relations?.length && { relations: options.relations }),
    });

    return result.map((i) => i.toModel());
  }

  async selectPagination(
    where: FindOptionsWhere<SegmentEntity>,
    paginationParams: TPaginationParams<SegmentEntity>,
    options?: TOptions,
  ): Promise<TPagination<TSegmentModel>> {
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

  async create(data: Partial<TSegmentModel>, attributes?: AttributeOptions): Promise<TSegmentModel> {
    const entity = this.repository.create(data);

    const { id } = await this.repository.save(entity);

    const result = await this.selectOne({ id }, { attributes });

    return result!;
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete({ id });
  }

  async update(id: string, data: Partial<TSegmentModel>): Promise<TSegmentModel> {
    await this.repository.update({ id }, data);

    const result = await this.selectOne({ id });

    return result!;
  }
}
