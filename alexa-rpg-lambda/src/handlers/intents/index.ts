import { RequestHandler } from 'ask-sdk-core';

import { DateOfBirthHandler } from '../helper-handlers';
import { NarrateSegmentHandler } from '../segment';
import {
  ChooseContinueOrNewStoryHandler,
  ChooseProgressStoryHandler,
  ChooseStoryHandler,
  NewStoryHandler,
} from '../story';

const StoryIntentHandlers: RequestHandler[] = [
  ChooseStoryHandler,
  ChooseContinueOrNewStoryHandler,
  ChooseProgressStoryHandler,
  NewStoryHandler,
];

const SegmentIntentHandlers: RequestHandler[] = [NarrateSegmentHandler];

export const IntentHandlers: RequestHandler[] = [DateOfBirthHandler, ...StoryIntentHandlers, ...SegmentIntentHandlers];
