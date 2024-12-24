import httpStatus from 'http-status';

import { HttpError } from './http-error';

export class UnauthorizedError extends HttpError {
  constructor(message = 'Check your credentials and try again later') {
    super(`Unauthorized: ${message}`, httpStatus.UNAUTHORIZED);
    this.name = 'UnauthorizedError';
  }
}
