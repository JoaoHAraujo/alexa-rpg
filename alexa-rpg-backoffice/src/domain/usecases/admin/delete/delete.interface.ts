export interface IDeleteAdminUseCase {
  execute(idAdmin: string): Promise<void>;
}
