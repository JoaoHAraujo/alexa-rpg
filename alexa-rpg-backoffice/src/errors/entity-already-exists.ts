import httpStatus from 'http-status';

import { HttpError } from './http-error';

export class EntityAlreadyExistsError extends HttpError {
  constructor(entity: string) {
    super(`Entity already exists: ${entity}`, httpStatus.BAD_REQUEST);
    this.name = 'EntityAlreadyExistsError';
  }
}
