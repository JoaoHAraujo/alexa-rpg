import { HttpError } from './http-error';

export class ApiError extends HttpError {
  constructor(functionName: string, message: string, status: number) {
    super(`${functionName} Error: ${message}`, status);
  }
}
