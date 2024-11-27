export interface IDeleteStoryUseCase {
  execute(idStory: string): Promise<void>;
}
