import { ApiError } from '@src/errors';
import httpStatus from 'http-status';

export class apiHandleError {
  constructor(functionName: string, err: any) {
    let message: string = err.message;
    let status: number = httpStatus.INTERNAL_SERVER_ERROR;

    if (err.response?.data?.info) {
      message = err.response?.data?.info;
      status = err.response?.status;
    }

    throw new ApiError(functionName, message, err.status);
  }
}
