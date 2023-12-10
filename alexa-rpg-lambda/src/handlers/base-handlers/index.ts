import { SessionEndedRequestHandler } from "./session-ended.handler";
import { ExitHandler } from "./exit.handler";
import { FallbackHandler } from "./fallback.handler";
import { LaunchRequestHandler } from "./launch-request.handler";

export { ErrorHandler } from "./error.handler";
export const BaseHandlers = [
  LaunchRequestHandler,
  SessionEndedRequestHandler,
  ExitHandler,
  FallbackHandler,
];
