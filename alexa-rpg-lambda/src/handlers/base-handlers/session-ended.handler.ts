import { getRequestType, HandlerInput, RequestHandler } from 'ask-sdk-core';

export const SessionEndedRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
  },

  handle(handlerInput: HandlerInput) {
    return handlerInput.responseBuilder
      .speak('Até a próxima! Se quiser continuar a história ou iniciar uma nova aventura, é só me chamar.')
      .withShouldEndSession(true)
      .getResponse();
  },
};
