export interface IDeleteSegmentUseCase {
  execute(idSegment: string): Promise<void>;
}
