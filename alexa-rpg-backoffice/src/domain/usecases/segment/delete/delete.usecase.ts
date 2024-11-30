import { Entities } from '@src/enums';
import { EntityNotFoundError, InvalidParamError } from '@src/errors';
import { SegmentRepositoryInterface } from '@src/infra/db/repositories';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';

import { IDeleteSegmentUseCase } from './delete.interface';

@provideSingleton(DeleteSegmentUseCase)
export class DeleteSegmentUseCase implements IDeleteSegmentUseCase {
  constructor(
    @inject(TYPES.repositories.SegmentRepository)
    private readonly segmentRepository: SegmentRepositoryInterface,
  ) {}

  async execute(idSegment: string): Promise<void> {
    const segmentExists = await this.segmentRepository.selectOne({ id: idSegment });

    if (!segmentExists) throw new EntityNotFoundError(Entities.SEGMENT);

    if (segmentExists.isFirst) {
      throw new InvalidParamError(
        'This is a first segment. Define another segment as first for the story before deleting this one.',
      );
    }

    await this.segmentRepository.delete(idSegment);
  }
}
