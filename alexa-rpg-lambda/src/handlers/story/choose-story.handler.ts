import { getIntentName, getRequestType, getSlotValue, HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

import { IntentName } from '../../enums';
import { TStoryModel } from '../../models';

type TSessionAttributes = {
  stories: TStoryModel[];
  idAmazon: string;
  age: number;
};

export const ChooseStoryIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return (
      getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      getIntentName(handlerInput.requestEnvelope) === IntentName.ChooseStoryIntent
    );
  },
  handle(handlerInput: HandlerInput): Response {
    try {
      const chosenStoryName = getSlotValue(handlerInput.requestEnvelope, 'storyName');
      const sessionAttributes = handlerInput.attributesManager.getSessionAttributes<TSessionAttributes>();
      const stories = sessionAttributes.stories || [];

      const chosenStory = stories.find((story) => story.title?.toLowerCase() === chosenStoryName?.toLowerCase());

      if (chosenStory) {
        const speechOutput = `Você escolheu a história: ${chosenStory.title}`;

        return handlerInput.responseBuilder.speak(speechOutput).getResponse();
      } else {
        return handlerInput.responseBuilder
          .speak('Não entendi sua resposta. Escolhe de novo aí.')
          .reprompt('Tá esperando o quê, doido? Bora!')
          .getResponse();
      }
    } catch (err: any) {
      console.log(err);
      return handlerInput.responseBuilder.speak(err.message).getResponse();
    }
  },
};
