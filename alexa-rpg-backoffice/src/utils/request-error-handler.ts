/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Environment, getEnv } from '@src/constants';
import { HttpError } from '@src/errors/http-error';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ValidateError } from 'tsoa';

export function requestErrorHandler(err: any, req: Request, res: Response): void {
  switch (true) {
    case err instanceof HttpError:
      res.status(err.statusCode).json({ error: err.message });
      break;

    case err instanceof ValidateError:
      console.warn(`Caught Validation Error for ${req.path}:`, err.fields);

      res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        message: 'Validation Failed',
        details: err.fields,
      });
      break;

    default:
      const isPrd = getEnv()?.env === Environment.PROD;

      const jsonResponse = {
        error: 'Internal Server Error',
        ...(!isPrd && { message: err.message, stack: err.stack }),
      };

      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(jsonResponse);
      break;
  }
}
