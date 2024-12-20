import { TBaseModel } from './base.model';

export type TAdminModel = TBaseModel & {
  name: string;
  email: string;
  password: string;
};
