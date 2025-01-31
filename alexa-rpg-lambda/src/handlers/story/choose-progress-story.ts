import { getIntentName, getRequestType, getSlotValue, HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

import { ContinueStoryChoice, IntentName, SlotsName } from '../../enums';
import { getSessionAttributes, setSessionAttributes } from '../../helpers/session-attributes';
import { TStoryModel } from '../../models';
import { ChooseStoryHandler } from './choose-story.handler';

export const ChooseProgressStoryHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const storyChoice = getSlotValue(handlerInput.requestEnvelope, SlotsName.continueStoryChoice);

    return (
      getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      getSessionAttributes(handlerInput).step === IntentName.ChooseProgressStoryIntent &&
      storyChoice === ContinueStoryChoice.savedProgress
    );
  },

  async handle(handlerInput: HandlerInput): Promise<Response> {
    try {
      const sessionAttributes = getSessionAttributes(handlerInput);

      if (!sessionAttributes.progressStories?.length) throw new Error('UserProgresses not found on session attributes');

      const stories = (sessionAttributes.progressStories ?? [])
        .map((userProgress) => userProgress.story)
        .filter((story) => !!story) as TStoryModel[];

      setSessionAttributes(handlerInput, {
        stories,
        choseToContinueStory: true,
        step: IntentName.ChooseStoryIntent,
      });

      return ChooseStoryHandler.handle(handlerInput);
    } catch (err: any) {
      console.log(err);
      return handlerInput.responseBuilder.speak(err.message).getResponse();
    }
  },
};
