import { HandlerInput, RequestHandler } from 'ask-sdk-core';

export const SessionEndedRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput: HandlerInput) {
    return handlerInput.responseBuilder.speak('Fechando skill').getResponse();
  },
};
