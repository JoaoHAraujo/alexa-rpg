import { getRequestType, HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

export const LaunchRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  async handle(handlerInput: HandlerInput): Promise<Response> {
    try {
      const speechText = 'Bem-vindo à primeira versão da skill "Decida e Viva".';
      const askBirthDateText = 'Para começar, informe sua data de nascimento';

      const responseBuilder = handlerInput.responseBuilder
        .speak(speechText + askBirthDateText)
        .reprompt('Por favor, diga sua data de nascimento para continuarmos.');

      return responseBuilder.getResponse();
    } catch (err: any) {
      console.log(err);
      return handlerInput.responseBuilder.speak(err.message).getResponse();
    }
  },
};
