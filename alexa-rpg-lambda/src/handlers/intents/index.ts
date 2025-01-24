import { RequestHandler } from 'ask-sdk-core';

import { DateOfBirthIntentHandler } from '../helper-handlers';
import { ChooseStoryIntentHandler } from '../story';
import { ChooseContinueOrNewStoryHandler } from '../story/choose-continue-or-new-story.handler';

export const IntentHandlers: RequestHandler[] = [
  DateOfBirthIntentHandler,
  ChooseStoryIntentHandler,
  ChooseContinueOrNewStoryHandler,
];
