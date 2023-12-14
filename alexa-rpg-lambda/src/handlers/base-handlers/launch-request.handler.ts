import { StoryApi } from '@src/api';
import { getRequestType, HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

export const LaunchRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  async handle(handlerInput: HandlerInput): Promise<Response> {
    try {
      const speechText = 'Bem-vindo à primeira versão da skill de histórias interativas';

      const responseBuilder = handlerInput.responseBuilder.speak(speechText);

      const result = await StoryApi.getById('f269da7c-1d8d-4c18-977c-dfab8d0f6e2a');

      return responseBuilder.getResponse();
    } catch (err: any) {
      return handlerInput.responseBuilder.speak(err.message).getResponse();
    }
  },
};
