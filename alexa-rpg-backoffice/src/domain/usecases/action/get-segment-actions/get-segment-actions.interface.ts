import { TActionModel } from '@src/domain/models';

export interface IGetSegmentActionsUseCase {
  execute(idSegment: string): Promise<TActionModel[]>;
}
