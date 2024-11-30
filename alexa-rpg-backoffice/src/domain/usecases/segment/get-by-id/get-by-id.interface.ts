import { TSegmentModel } from '@src/domain/models';

export interface IGetSegmentByIdUseCase {
  execute(idSegment: string): Promise<TSegmentModel | null>;
}
