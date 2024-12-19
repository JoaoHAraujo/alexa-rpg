export interface IDeleteActionUseCase {
  execute(idAction: string): Promise<boolean>;
}
