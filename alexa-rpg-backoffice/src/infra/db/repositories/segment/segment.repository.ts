import { TSegmentModel } from '@src/domain/models';
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
    });

    return result?.toModel() ?? null;
  }

  async create(data: Partial<TSegmentModel>, attributes?: AttributeOptions): Promise<TSegmentModel> {
    const entity = this.repository.create(data);

    const { id } = await this.repository.save(entity);

    const result = await this.selectOne({ id }, { attributes });

    return result!;
  }
}
