import { RequestHandler } from 'ask-sdk-core';

import { DateOfBirthIntentHandler } from '../helper-handlers';
import { ChooseStoryIntentHandler } from '../story';
import { ContinueStoryHandler } from '../story/continue-story.handler';

export const IntentHandlers: RequestHandler[] = [
  DateOfBirthIntentHandler,
  ChooseStoryIntentHandler,
  ContinueStoryHandler,
];
