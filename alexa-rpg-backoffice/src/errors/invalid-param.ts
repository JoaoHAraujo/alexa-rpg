import httpStatus from 'http-status';

import { HttpError } from './http-error';

export class InvalidParamError extends HttpError {
  constructor(paramName: string) {
    super(`Invalid parameter: ${paramName}`, httpStatus.UNPROCESSABLE_ENTITY);
    this.name = 'InvalidParamError';
  }
}
