import { RequestHandler } from 'ask-sdk-core';

import { StorySelectionHandler } from '../base-handlers/launch-request.handler';

export const IntentHandlers: RequestHandler[] = [StorySelectionHandler];
