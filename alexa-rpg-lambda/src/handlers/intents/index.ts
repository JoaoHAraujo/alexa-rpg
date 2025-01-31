import { RequestHandler } from 'ask-sdk-core';

import { DateOfBirthHandler } from '../helper-handlers';
import {
  ChooseContinueOrNewStoryHandler,
  ChooseProgressStoryHandler,
  ChooseStoryHandler,
  NewStoryHandler,
} from '../story';

export const IntentHandlers: RequestHandler[] = [
  DateOfBirthHandler,
  ChooseStoryHandler,
  ChooseContinueOrNewStoryHandler,
  ChooseProgressStoryHandler,
  NewStoryHandler,
];
