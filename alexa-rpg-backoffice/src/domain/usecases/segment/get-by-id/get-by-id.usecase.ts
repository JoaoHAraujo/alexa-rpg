import { TSegmentModel } from '@src/domain/models';
import { SegmentRepositoryInterface } from '@src/infra/db/repositories';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';

import { IGetSegmentByIdUseCase } from './get-by-id.interface';

@provideSingleton(GetSegmentByIdUseCase)
export class GetSegmentByIdUseCase implements IGetSegmentByIdUseCase {
  constructor(
    @inject(TYPES.repositories.SegmentRepository)
    private readonly segmentRepository: SegmentRepositoryInterface,
  ) {}

  async execute(idSegment: string): Promise<TSegmentModel | null> {
    return this.segmentRepository.selectOne({ id: idSegment });
  }
}
