export interface IFinalizeUserProgressUseCase {
  execute(idProgress: string, idAmazon: string): Promise<void>;
}
