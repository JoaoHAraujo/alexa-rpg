import { TUserProgressModel } from '@src/domain/models';

export type TUpsertUserProgressInput = {
  idAmazon: string;
  idStory: string;
  idNewSegment: string;
};

export interface IUpsertUserProgressUseCase {
  execute(input: TUpsertUserProgressInput): Promise<TUserProgressModel>;
}
