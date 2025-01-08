import { RequestHandler } from 'ask-sdk-core';

import { DateOfBirthIntentHandler } from '../helper-handlers';
import { ChooseStoryIntentHandler } from '../story';

export const IntentHandlers: RequestHandler[] = [DateOfBirthIntentHandler, ChooseStoryIntentHandler];
