import { TTagModel } from '@src/domain/models';
import { TEntitiesWithTags } from '@src/enums';
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

  async checkNonExistentTags(idStory: string, tagsToCheck: string[], entity: TEntitiesWithTags): Promise<string[]> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const missingTags: Array<{ tag: string; count: number }> = await this.repository.query(`SELECT
        tags2.tag AS "tag",
        COUNT(unnested_tags.tag) AS "tagCount"
        FROM 
          (SELECT unnest(ARRAY[${tagsToCheck.map((i) => `'${i}'`).join(',')}]) AS tag) AS tags2
        LEFT JOIN 
          (SELECT unnest(${entity}.tags) AS tag FROM ${entity} WHERE ${entity}.deleted_at IS NULL AND ${entity}.id_story = '${idStory}') AS unnested_tags 
          ON unnested_tags.tag = tags2.tag
        GROUP BY
          tags2.tag
        HAVING
          COUNT(unnested_tags.tag) = 0;`);

    return missingTags?.map((i) => i.tag);
  }

  async bulkCreate(data: Array<Partial<TTagModel>>): Promise<TTagModel[]> {
    const entities = this.repository.create(data);

    const actionsSaved = await this.repository.save(entities);

    return actionsSaved.map((action) => action.toModel());
  }

  async bulkDelete(where: FindOptionsWhere<TagEntity>): Promise<void> {
    await this.repository.softDelete(where);
  }
}
