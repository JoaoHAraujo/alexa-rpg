import { getRequestType, getUserId, HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

import { UserProgressApi } from '../../api';
import { IntentName } from '../../enums';
import { getSessionAttributes } from '../../helpers/session-attributes';

export const EndStoryHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const { step } = getSessionAttributes(handlerInput);
    return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' && step === IntentName.EndStoryIntent;
  },

  async handle(handlerInput: HandlerInput): Promise<Response> {
    const idAmazon = getUserId(handlerInput.requestEnvelope);
    const { idUserProgress } = getSessionAttributes(handlerInput);

    if (idUserProgress) {
      await UserProgressApi.finalizeProgress(idAmazon, idUserProgress);
    }

    const { finalSegmentNarrative } = handlerInput.attributesManager.getRequestAttributes();

    const finalMessage = `${finalSegmentNarrative}. FIM! Essa foi a sua jornada. Espero que tenha gostado! Até a próxima.`;

    return handlerInput.responseBuilder.speak(finalMessage).withShouldEndSession(true).getResponse();
  },
};
