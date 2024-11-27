import { getIntentName, getRequestType, getSlotValue, HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

import { StoryApi } from '../../api';
import { StoryModel } from '../../models';

export const LaunchRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  async handle(handlerInput: HandlerInput): Promise<Response> {
    try {
      const stories = await StoryApi.getRandom(5);

      handlerInput.attributesManager.setSessionAttributes({ stories });

      const storyTitles = stories.map((story) => story.title).join(', ');

      const speechText = `TESTE! Bem-vindo à primeira versão da skill de histórias interativas. Escolha uma história: ${storyTitles}`;

      const responseBuilder = handlerInput.responseBuilder
        .speak(`${speechText}`)
        .reprompt('Por favor, escolha uma história pelo seu número. Tá com medo da aventura?');

      return responseBuilder.getResponse();
    } catch (err: any) {
      console.log(err);
      return handlerInput.responseBuilder.speak(err.message).getResponse();
    }
  },
};

export const ChooseStoryIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return (
      getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      getIntentName(handlerInput.requestEnvelope) === 'ChooseStoryIntent'
    );
  },
  handle(handlerInput: HandlerInput): Response {
    try {
      const chosenStoryName = getSlotValue(handlerInput.requestEnvelope, 'storyName'); //TODO enum
      const sessionAttributes = handlerInput.attributesManager.getSessionAttributes<{ stories: StoryModel[] }>();
      const stories = sessionAttributes.stories || [];
      console.log(JSON.stringify(handlerInput, null, 2));

      const chosenStory = stories.find((story) => story.title?.toLowerCase() === chosenStoryName?.toLowerCase());

      if (chosenStory) {
        const speechOutput = `Você escolheu a história: ${chosenStory.title}`;

        return handlerInput.responseBuilder.speak(speechOutput).getResponse();
      } else {
        return handlerInput.responseBuilder
          .speak(`Não entendi sua resposta. Escolhe de novo aí. ${chosenStoryName}`)
          .reprompt('Tá esperando o quê, doido? Bora!')
          .getResponse();
      }
    } catch (err: any) {
      console.log(err);
      return handlerInput.responseBuilder.speak(err.message).getResponse();
    }
  },
};
