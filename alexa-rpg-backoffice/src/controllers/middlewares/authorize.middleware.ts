/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { JwtAdapter } from '@src/adapters/jwt.adapter';
import { Auth } from '@src/domain/models';
import { UnauthorizedError } from '@src/errors';
import { iocContainer } from '@src/server';
import { ICustomRequest } from '@src/utils/interfaces/custom-request';
import { NextFunction, Response } from 'express';

export const authorize = (req: ICustomRequest, _res: Response, next: NextFunction): void => {
  const decodedToken = checkToken(req.headers);
  const idAmazon = checkIdAmazon(req.headers);

  if (decodedToken) {
    req.user = decodedToken;
  }

  if (idAmazon) {
    req.user = { idAmazon };
  }

  if (!decodedToken && !idAmazon) {
    throw new UnauthorizedError();
  }

  next();
};

function checkToken(headers: ICustomRequest['headers']): Auth | null {
  const token = headers.authorization;

  if (!token) return null;

  const jwtAdapter = iocContainer.resolve(JwtAdapter);

  const decodedToken = jwtAdapter.verifyToken(token);

  if (!decodedToken) return null;

  return decodedToken;
}

function checkIdAmazon(headers: ICustomRequest['headers']): string | null {
  const idAmazon = headers['x-id-amazon'];

  if (!idAmazon) return null;

  return idAmazon;
}
