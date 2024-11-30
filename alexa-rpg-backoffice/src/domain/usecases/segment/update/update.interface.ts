import { TSegmentModel, TUpdateSegmentInput } from '@src/domain/models';

export interface IUpdateSegmentUseCase {
  execute(idSegment: string, input: TUpdateSegmentInput): Promise<TSegmentModel>;
}
