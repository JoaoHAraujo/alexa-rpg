import { RequestHandler } from 'ask-sdk-core';

import { DateOfBirthHandler } from '../helper-handlers';
import { ChooseProgressStoryHandler, ChooseStoryHandler } from '../story';
import { ChooseContinueOrNewStoryHandler } from '../story/choose-continue-or-new-story.handler';

export const IntentHandlers: RequestHandler[] = [
  DateOfBirthHandler,
  ChooseStoryHandler,
  ChooseContinueOrNewStoryHandler,
  ChooseProgressStoryHandler,
];
