import { SkillBuilders } from 'ask-sdk-core';

import { IntentHandlers } from './handlers';
import { BaseHandlers, ErrorHandler } from './handlers/base-handlers';

export const handler = SkillBuilders.custom()
  .addRequestHandlers(...BaseHandlers, ...IntentHandlers)
  .addErrorHandlers(ErrorHandler)
  .lambda();
