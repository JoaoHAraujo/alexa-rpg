import { TSegmentModel } from '@src/domain/models';
import { Entities } from '@src/enums';
import { EntityNotFoundError } from '@src/errors';
import { SegmentRepositoryInterface } from '@src/infra/db/repositories';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';
import { Not } from 'typeorm';

import { IMakeSegmentFirstUseCase } from './make-first.interface';

@provideSingleton(MakeSegmentFirstUseCase)
export class MakeSegmentFirstUseCase implements IMakeSegmentFirstUseCase {
  constructor(
    @inject(TYPES.repositories.SegmentRepository)
    private readonly segmentRepository: SegmentRepositoryInterface,
  ) {}

  async execute(idSegment: string): Promise<void> {
    const segment = await this.segmentRepository.selectOne({ id: idSegment });

    if (!segment) throw new EntityNotFoundError(Entities.SEGMENT);

    const firstSegment = await this.segmentRepository.selectOne({
      id: Not(idSegment),
      idStory: segment.idStory,
      isFirst: true,
    });

    if (firstSegment) {
      this.segmentRepository.update(firstSegment.id, { isFirst: false });
    }

    await this.segmentRepository.update(segment.id, { isFirst: true });
  }
}
