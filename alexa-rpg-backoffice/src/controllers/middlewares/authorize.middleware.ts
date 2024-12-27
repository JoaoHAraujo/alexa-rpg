/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { JwtAdapter } from '@src/adapters/jwt.adapter';
import { UnauthorizedError } from '@src/errors';
import { iocContainer } from '@src/server';
import { ICustomRequest } from '@src/utils/interfaces/custom-request';
import { NextFunction, Response } from 'express';

export const authorize = (req: ICustomRequest, _res: Response, next: NextFunction): void => {
  const token = req.headers.authorization;

  if (!token) throw new UnauthorizedError();

  const jwtAdapter = iocContainer.resolve(JwtAdapter);

  const decodedToken = jwtAdapter.verifyToken(token);

  if (!decodedToken) throw new UnauthorizedError();

  req.user = decodedToken;

  next();
};
