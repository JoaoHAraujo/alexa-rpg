import { TUserProgressModel } from '@src/domain/models';

export interface ISelectUserProgressesUseCase {
  execute(idAmazon: string, age: number): Promise<TUserProgressModel[]>;
}
