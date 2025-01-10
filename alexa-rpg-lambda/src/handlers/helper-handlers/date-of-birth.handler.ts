import { getIntentName, getRequestType, getSlotValue, HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

import { IntentName } from '../../enums';

export const DateOfBirthIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return (
      getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      getIntentName(handlerInput.requestEnvelope) === IntentName.CaptureDateOfBirthIntent
    );
  },
  handle(handlerInput: HandlerInput): Response {
    const dateOfBirthSlot = getSlotValue(handlerInput.requestEnvelope, 'dateOfBirth');

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

    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    sessionAttributes.dateOfBirth = dateOfBirthSlot;
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

    // TROCAR POR DELEGATE PARA ESCOLHA DE HISTORIA
    return handlerInput.responseBuilder
      .addDelegateDirective({
        name: IntentName.ChooseStoryIntent,
        confirmationStatus: 'NONE',
      })
      .getResponse();
  },
};
