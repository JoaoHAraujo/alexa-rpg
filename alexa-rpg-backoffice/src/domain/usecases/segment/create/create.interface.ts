import { TCreateSegmentInput, TSegmentModel } from '@src/domain/models';

export interface ICreateSegmentUseCase {
  execute(segment: TCreateSegmentInput): Promise<TSegmentModel>;
}
