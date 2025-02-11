import { RequestHandler } from 'ask-sdk-core';

import { DateOfBirthHandler, EndStoryHandler } from './helper-handlers';
import { NarrateSegmentHandler } from './segment';
import {
  ChooseContinueOrNewStoryHandler,
  ChooseProgressStoryHandler,
  ChooseStoryHandler,
  NewStoryHandler,
} from './story';

const StoryIntentHandlers: RequestHandler[] = [
  ChooseStoryHandler,
  ChooseContinueOrNewStoryHandler,
  ChooseProgressStoryHandler,
  NewStoryHandler,
];

const SegmentIntentHandlers: RequestHandler[] = [NarrateSegmentHandler];

const HelperHandlers: RequestHandler[] = [DateOfBirthHandler, EndStoryHandler];

export const IntentHandlers: RequestHandler[] = [...HelperHandlers, ...StoryIntentHandlers, ...SegmentIntentHandlers];
