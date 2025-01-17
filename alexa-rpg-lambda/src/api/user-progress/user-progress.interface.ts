import { TUserProgressModel } from '../../models';

export interface IUserProgressApi {
  getAllFromUser: (idAmazon: string, age: number) => Promise<TUserProgressModel[]>;
  updateProgress: (idAmazon: string, body: { idStory: string; idNewSegment: string }) => Promise<TUserProgressModel>;
  finalizeProgress: (idAmazon: string, idProgress: string) => Promise<boolean>;
}
