import { getIntentName, getRequestType, getSlotValue, getUserId, HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

import { StoryApi } from '../../api';
import { getEnv } from '../../constants';
import { ContinueStoryChoice, IntentName, SlotsName } from '../../enums';
import { getSessionAttributes, setSessionAttributes } from '../../helpers/session-attributes';
import { ChooseStoryHandler } from './choose-story.handler';

export const NewStoryHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const storyChoice = getSlotValue(handlerInput.requestEnvelope, SlotsName.continueStoryChoice);

    return (
      getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      getSessionAttributes(handlerInput).step === IntentName.NewStoryIntent &&
      storyChoice === ContinueStoryChoice.newStory
    );
  },

  async handle(handlerInput: HandlerInput): Promise<Response> {
    try {
      const sessionAttributes = getSessionAttributes(handlerInput);
      const { userAge, choseToContinueStory } = sessionAttributes;
      const idAmazon = getUserId(handlerInput.requestEnvelope);

      if (!userAge || userAge < 0) throw new Error('Age not defined');

      if (typeof choseToContinueStory !== 'boolean' || choseToContinueStory) {
        throw new Error('User did not chose to start new Story');
      }

      const stories = await StoryApi.getRandom(idAmazon, getEnv().listStoryLimit, userAge);

      if (!stories.length) throw new Error('No stories were found');

      setSessionAttributes(handlerInput, {
        stories,
        choseToContinueStory: false,
        step: IntentName.ChooseStoryIntent,
      });

      return ChooseStoryHandler.handle(handlerInput);
    } catch (err: any) {
      console.log(err);
      return handlerInput.responseBuilder.speak(err.message).getResponse();
    }
  },
};
