import { TAdminModel } from '@src/domain/models';
import { TPagination } from '@src/utils/interfaces/pagination';
import { formatPagination, makePagination, TPaginationParams } from '@src/utils/pagination';
import { provideSingleton } from '@src/utils/provide-singleton';
import { FindOptionsWhere, Repository } from 'typeorm';

import { DatabaseProvider } from '../../config/database';
import { AdminEntity } from '../../entities';
import { attributeSelector } from '../attribute-selector';
import { AdminRepositoryInterface, TAdminAttributeOptions, TOptions } from './admin.interface';

@provideSingleton(AdminRepository)
export class AdminRepository implements AdminRepositoryInterface {
  private readonly repository: Repository<AdminEntity>;

  constructor() {
    this.repository = DatabaseProvider.getRepository(AdminEntity);
  }

  async selectOne(where: FindOptionsWhere<AdminEntity>, options?: TOptions): Promise<TAdminModel | null> {
    const timestamps = !!options?.attributes?.timestamps;

    const result = await this.repository.findOne({
      where,
      select: { ...attributeSelector(this.repository, { timestamps }), password: options?.attributes?.password },
      ...(options?.relations?.length && { relations: options.relations }),
    });

    return result?.toModel() ?? null;
  }

  async create(data: Partial<TAdminModel>, attributes?: TAdminAttributeOptions): Promise<TAdminModel> {
    const entity = this.repository.create(data);

    const { id } = await this.repository.save(entity);

    const result = await this.selectOne({ id }, { attributes });

    return result!;
  }

  async delete(where: FindOptionsWhere<AdminEntity>): Promise<void> {
    await this.repository.softDelete(where);
  }

  async update(id: string, data: Partial<TAdminModel>): Promise<TAdminModel> {
    await this.repository.update({ id }, data);

    const result = await this.selectOne({ id });

    return result!;
  }

  async selectPagination(
    where: FindOptionsWhere<AdminEntity>,
    paginationParams: TPaginationParams<AdminEntity>,
    options?: TOptions,
  ): Promise<TPagination<TAdminModel>> {
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
}
