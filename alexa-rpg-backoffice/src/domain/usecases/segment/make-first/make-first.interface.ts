export interface IMakeSegmentFirstUseCase {
  execute(idSegment: string): Promise<void>;
}
