import { Auth } from '@src/domain/models/auth';
import { Request } from 'express';

export interface ICustomRequest extends Request {
  headers: { [key: string]: string };
  user: Auth;
}
