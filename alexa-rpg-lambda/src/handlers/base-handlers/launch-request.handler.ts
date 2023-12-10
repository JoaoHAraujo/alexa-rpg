import { getRequestType, HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

export const LaunchRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput: HandlerInput): Response {
    const speechText = 'Bem-vindo ao mundo mágico de Harry Potter!';
    const repromptText = 'Sobre quem quer saber mais?';

    return handlerInput.responseBuilder.speak(`${speechText} ${repromptText}`).reprompt(repromptText).getResponse();
  },
};
