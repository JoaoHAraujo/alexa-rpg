import { getIntentName, getRequestType, getUserId, HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

import { UserProgressApi } from '../../api';
import { IntentName } from '../../enums';

export const ContinueStoryHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return (
      getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      getIntentName(handlerInput.requestEnvelope) === IntentName.ContinueStoryHandler
    );
  },
  async handle(handlerInput: HandlerInput): Promise<Response> {
    try {
      const idAmazon = getUserId(handlerInput.requestEnvelope);
      const { userAge } = handlerInput.attributesManager.getSessionAttributes<{ userAge: number }>();

      if (!userAge) throw new Error('Age not defined');

      if (!idAmazon) throw new Error('idAmazon not defined');

      const progressStories = await UserProgressApi.getAllFromUser(idAmazon, userAge);

      const responseBuilder = handlerInput.responseBuilder;

      if (progressStories.length) {
        //questionar se quer conntinuar'
        responseBuilder
          .speak('Você possui historias em andamento salvas. Gostaria de escolher uma delas?')
          .reprompt('Não entendi. Gostaria de escolher uma das suas histórias em andamento?');
      } else {
        // delegar para busca random
        responseBuilder.speak('Ainda falta implementar o delegar para escolha randômica de histórias');
      }

      return responseBuilder.getResponse();
    } catch (err: any) {
      console.log(err);
      return handlerInput.responseBuilder.speak(err.message).getResponse();
    }
  },
};
