import { RequestHandler } from 'ask-sdk-core';

import { ChooseStoryIntentHandler } from '../story';

export const IntentHandlers: RequestHandler[] = [ChooseStoryIntentHandler];
