import { getIntentName, getRequestType, HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

import { StoryApi } from '../../api';
import { getEnv } from '../../constants';
import { IntentName } from '../../enums';
import { getSessionAttributes, setSessionAttributes } from '../../helpers/session-attributes';
import { ChooseStoryHandler } from './choose-story.handler';

export const NewStoryHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return (
      getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      getIntentName(handlerInput.requestEnvelope) === IntentName.NewStoryIntent
    );
  },
  async handle(handlerInput: HandlerInput): Promise<Response> {
    try {
      const sessionAttributes = getSessionAttributes(handlerInput);
      const { userAge, choseToContinueStory } = sessionAttributes;

      if (!userAge || userAge < 0) throw new Error('Age not defined');

      if (typeof choseToContinueStory !== 'boolean' || choseToContinueStory) {
        throw new Error('User did not chose to start new Story');
      }

      const stories = await StoryApi.getRandom(getEnv().listStoryLimit, userAge);

      setSessionAttributes(handlerInput, { ...sessionAttributes, stories, choseToContinueStory: false });

      return ChooseStoryHandler.handle(handlerInput);
    } catch (err: any) {
      console.log(err);
      return handlerInput.responseBuilder.speak(err.message).getResponse();
    }
  },
};
