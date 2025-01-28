import { getIntentName, getRequestType, getSlotValue, HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

import { IntentName, SlotsName } from '../../enums';
import { calculateAge } from '../../helpers/calculate-age';
import { getSessionAttributes, setSessionAttributes } from '../../helpers/session-attributes';
import { ChooseContinueOrNewStoryHandler } from '../story/choose-continue-or-new-story.handler';

export const DateOfBirthHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return (
      getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      getIntentName(handlerInput.requestEnvelope) === IntentName.CaptureDateOfBirthIntent
    );
  },
  async handle(handlerInput: HandlerInput): Promise<Response> {
    try {
      const dateOfBirthSlot = getSlotValue(handlerInput.requestEnvelope, SlotsName.dateOfBirth);

      if (!dateOfBirthSlot) {
        return handlerInput.responseBuilder
          .speak('Por favor, informe sua data de nascimento.')
          .reprompt('Não entendi. Qual sua data de nascimento?')
          .getResponse();
      }

      const dateOfBirth = new Date(dateOfBirthSlot);

      if (isNaN(dateOfBirth.getTime())) {
        return handlerInput.responseBuilder
          .speak('Não entendi a data informada. Pode repetir?')
          .reprompt('Não entendi. Poderia repetir sua data de nascimento?')
          .getResponse();
      }

      const sessionAttributes = getSessionAttributes(handlerInput);
      sessionAttributes.userAge = calculateAge(dateOfBirth);
      setSessionAttributes(handlerInput, sessionAttributes);

      return ChooseContinueOrNewStoryHandler.handle(handlerInput);
    } catch (err: any) {
      console.log(err);
      return handlerInput.responseBuilder.speak(err.message).getResponse();
    }
  },
};
