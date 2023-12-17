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
      let speechText = 'TESTE! Bem-vindo à primeira versão da skill de histórias interativas. Escolha uma história: ';
      const stories = await StoryApi.getRanddom(2);

      stories.forEach((story, index) => {
        speechText += `${index + 1}: ${story.title}; `;
      });

      handlerInput.attributesManager.setSessionAttributes({ stories });

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

export const StorySelectionHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return (
      getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      getIntentName(handlerInput.requestEnvelope) === 'StorySelectionIntent'
    );
  },
  handle(handlerInput: HandlerInput): Response {
    try {
      const chosenNumber = getSlotValue(handlerInput.requestEnvelope, 'number');
      const storyChoice = chosenNumber ? parseInt(chosenNumber) : null;

      const sessionAttributes = handlerInput.attributesManager.getSessionAttributes<{ stories: StoryModel[] }>();
      const stories = sessionAttributes.stories;

      if (storyChoice && stories && stories[storyChoice - 1]) {
        const chosenStory = stories[storyChoice - 1];
        const speechOutput = `Você escolheu a história: ${chosenStory.title}`;

        return handlerInput.responseBuilder.speak(speechOutput).getResponse();
      } else {
        return handlerInput.responseBuilder
          .speak('Não entendi sua resposta maluco. Escolhe de novo aí')
          .reprompt('Tá esperando o quê, doido? Bora!')
          .getResponse();
      }
    } catch (err: any) {
      console.log(err);
      return handlerInput.responseBuilder.speak(err.message).getResponse();
    }
  },
};
