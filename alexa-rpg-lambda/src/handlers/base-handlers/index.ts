import { RequestHandler } from 'ask-sdk-core';

import { ExitHandler } from './exit.handler';
import { FallbackHandler } from './fallback.handler';
import { LaunchRequestHandler } from './launch-request.handler';
import { SessionEndedRequestHandler } from './session-ended.handler';

export { ErrorHandler } from './error.handler';
export const BaseHandlers: RequestHandler[] = [
  LaunchRequestHandler,
  SessionEndedRequestHandler,
  ExitHandler,
  FallbackHandler,
];
