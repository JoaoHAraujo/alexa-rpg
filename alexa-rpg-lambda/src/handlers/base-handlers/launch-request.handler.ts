import { getRequestType, HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

import { StoryApi } from '../../api';

export const LaunchRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  async handle(handlerInput: HandlerInput): Promise<Response> {
    try {
      const stories = await StoryApi.getRandom(5);

      handlerInput.attributesManager.setSessionAttributes({ stories });

      const storyTitles = stories.map((story) => story.title).join(', ');

      const speechText = `Bem-vindo à primeira versão da skill de histórias interativas. Escolha uma história: ${storyTitles}`;

      const responseBuilder = handlerInput.responseBuilder
        .speak(`${speechText}`)
        .reprompt('Não entendi. Tá com medo da aventura? Escolha uma história para começar.');

      return responseBuilder.getResponse();
    } catch (err: any) {
      console.log(err);
      return handlerInput.responseBuilder.speak(err.message).getResponse();
    }
  },
};
