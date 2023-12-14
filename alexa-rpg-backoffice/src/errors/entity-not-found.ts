import httpStatus from 'http-status';

import { HttpError } from './http-error';

export class EntityNotFoundError extends HttpError {
  constructor(entity: string) {
    super(`Entity not found: ${entity}`, httpStatus.BAD_REQUEST);
    this.name = 'EntityNotFound';
  }
}
