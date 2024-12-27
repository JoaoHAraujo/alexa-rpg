import { TBaseModel } from './base.model';

export type TAdminModel = TBaseModel & {
  name: string;
  email: string;
  password: string;
};

export type TCreateAdminInput = Pick<TAdminModel, 'name' | 'email' | 'password'>;
export type TUpdateAdminInput = Partial<Pick<TAdminModel, 'name' | 'email' | 'password'>>;
