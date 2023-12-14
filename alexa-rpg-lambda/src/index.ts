import { SkillBuilders } from 'ask-sdk-core';

import { BaseHandlers, ErrorHandler } from './handlers/base-handlers';
import { IntentHandlers } from './handlers/intents';

export const handler = SkillBuilders.custom()
  .addRequestHandlers(...BaseHandlers, ...IntentHandlers)
  .addErrorHandlers(ErrorHandler)
  .lambda();
