import { getIntentName, getRequestType, getSlotValue, HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

import { IntentName, SlotsName, SlotsType } from '../../enums';
import { generateDirective } from '../../helpers/generate-directives';
import { getSessionAttributes } from '../../helpers/session-attributes';

export const ChooseStoryIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return (
      getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      getIntentName(handlerInput.requestEnvelope) === IntentName.ChooseStoryIntent
    );
  },
  handle(handlerInput: HandlerInput): Response {
    try {
      const chosenStoryName = getSlotValue(handlerInput.requestEnvelope, SlotsName.storyName);
      const { stories, choseToContinueStory } = getSessionAttributes(handlerInput);

      if (!stories?.length) throw new Error('Stories attribute not set');

      const chosenStory = stories.find((story) => story.title?.toLowerCase() === chosenStoryName?.toLowerCase());

      if (chosenStory) {
        // TODO configurar segmento e levar ao modulo de narração de segmento
        const speechOutput = `Você escolheu a história: ${chosenStory.title}`;

        return handlerInput.responseBuilder.speak(speechOutput).getResponse();
      } else {
        const storyTitles = stories.map((story) => story.title);

        const storyNameDirective = generateDirective(SlotsType.StoryNameType, storyTitles);

        const continueOrStart = choseToContinueStory ? 'continuar' : 'começar';
        const baseSpeechText = `Qual das seguintes histórias deseja ${continueOrStart}? ${storyTitles}`;

        return handlerInput.responseBuilder
          .addDirective(storyNameDirective)
          .speak(baseSpeechText)
          .reprompt(`Não entendi. ${baseSpeechText}`)
          .getResponse();
      }
    } catch (err: any) {
      console.log(err);
      return handlerInput.responseBuilder.speak(err.message).getResponse();
    }
  },
};
