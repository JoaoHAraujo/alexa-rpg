import { getIntentName, getRequestType, getSlotValue, getUserId, HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

import { UserProgressApi } from '../../api';
import { ContinueStoryChoice, IntentName } from '../../enums';
import { getSessionAttributes, setSessionAttributes } from '../../helpers/session-attributes';
import { ChooseProgressStoryHandler } from './choose-progress-story';
import { NewStoryHandler } from './new-story.handler';

export const ChooseContinueOrNewStoryHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return (
      getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      getIntentName(handlerInput.requestEnvelope) === IntentName.ChooseContinueOrNewStoryIntent
    );
  },
  async handle(handlerInput: HandlerInput): Promise<Response> {
    try {
      const idAmazon = getUserId(handlerInput.requestEnvelope);
      const sessionAttributes = getSessionAttributes(handlerInput);

      if (!sessionAttributes.userAge || sessionAttributes.userAge < 0) throw new Error('Age not defined');

      if (!idAmazon) throw new Error('idAmazon not defined');

      const continueStoryChoice = getSlotValue(handlerInput.requestEnvelope, 'continueStoryChoice');

      // Second time this handler executes. Redirects flow.
      if (continueStoryChoice) {
        switch (continueStoryChoice.toLowerCase()) {
          case ContinueStoryChoice.savedProgress:
            return ChooseProgressStoryHandler.handle(handlerInput);

          case ContinueStoryChoice.newStory:
            return NewStoryHandler.handle(handlerInput);

          default:
            throw new Error('Invalid Choice');
        }
      }

      const progressStories = await UserProgressApi.getAllFromUser(idAmazon, sessionAttributes.userAge);

      if (progressStories.length) {
        setSessionAttributes(handlerInput, { ...sessionAttributes, progressStories });

        return handlerInput.responseBuilder
          .speak(
            'Você possui histórias em andamento salvas. Diga "história salva" para escolher uma delas ou "nova história" para começar uma nova.',
          )
          .reprompt('Diga "história salva" para continuar ou "nova história" para começar uma nova.')
          .getResponse();
      } else {
        return NewStoryHandler.handle(handlerInput);
      }
    } catch (err: any) {
      console.log(err);
      return handlerInput.responseBuilder.speak(err.message).getResponse();
    }
  },
};
