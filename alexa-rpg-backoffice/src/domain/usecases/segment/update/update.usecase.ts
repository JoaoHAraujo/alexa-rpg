import { TSegmentModel, TUpdateSegmentInput } from '@src/domain/models';
import { Entities } from '@src/enums';
import { EntityNotFoundError } from '@src/errors';
import { SegmentRepositoryInterface } from '@src/infra/db/repositories';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';

import { IUpdateSegmentUseCase } from './update.interface';

@provideSingleton(UpdateSegmentUseCase)
export class UpdateSegmentUseCase implements IUpdateSegmentUseCase {
  constructor(
    @inject(TYPES.repositories.SegmentRepository)
    private readonly segmentRepository: SegmentRepositoryInterface,
  ) {}

  async execute(idSegment: string, input: TUpdateSegmentInput): Promise<TSegmentModel> {
    const segment = await this.segmentRepository.selectOne({ id: idSegment });

    if (!segment) throw new EntityNotFoundError(Entities.SEGMENT);

    const response = await this.segmentRepository.update(idSegment, input);

    return response;
  }
}
