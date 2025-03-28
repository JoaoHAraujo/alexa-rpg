import { getRequestType, getSlotValue, getUserId, HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

import { UserProgressApi } from '../../api';
import { SegmentApi } from '../../api/segment';
import { IntentName, SlotsName, SlotsType } from '../../enums';
import { calculateSuccess } from '../../helpers/calculate-success';
import { generateDirective } from '../../helpers/generate-directives';
import { getListPrompt } from '../../helpers/get-list-prompt';
import { deleteSessionAttributes, getSessionAttributes, setSessionAttributes } from '../../helpers/session-attributes';
import { TSegmentModel } from '../../models';
import { EndStoryHandler } from '../helper-handlers';

const narrateSegment = async (handlerInput: HandlerInput): Promise<Response> => {
  const idAmazon = getUserId(handlerInput.requestEnvelope);
  const { idSegment } = getSessionAttributes(handlerInput);

  if (!idAmazon) throw new Error('idAmazon not defined');

  if (!idSegment) throw new Error('idSegment not defined');

  const segment = await SegmentApi.getById(idAmazon, idSegment);

  if (!segment) throw new Error('Segment not found');

  return promptActionChoice(handlerInput, segment);
};

const promptActionChoice = async (handlerInput: HandlerInput, segment: TSegmentModel): Promise<Response> => {
  const responseBuilder = handlerInput.responseBuilder;

  if (segment.actions?.length) {
    setSessionAttributes(handlerInput, { actions: segment.actions, isStoryFinished: false });

    const actionDescriptions = segment.actions?.map((action) => action.description);

    const actionNameDirectives = generateDirective(SlotsType.ActionNameType, actionDescriptions);

    const actionPrompt = ` O que deseja fazer? ${getListPrompt(actionDescriptions)}`;

    const speechText = `${segment.narrative}. ${actionPrompt}`;

    return responseBuilder
      .addDirective(actionNameDirectives)
      .speak(speechText)
      .reprompt(`Não entendi. ${speechText}`)
      .getResponse();
  } else {
    setSessionAttributes(handlerInput, { isStoryFinished: true, step: IntentName.EndStoryIntent });

    handlerInput.attributesManager.setRequestAttributes({
      ...handlerInput.attributesManager.getRequestAttributes(),
      finalSegmentNarrative: segment.narrative,
    });
    // TODO chamar handler de encerramento de skill (customizar)
    // responseBuilder.speak(segment.narrative);

    return EndStoryHandler.handle(handlerInput);
  }
};

export const NarrateSegmentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const { step } = getSessionAttributes(handlerInput);

    return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' && step === IntentName.NarrateSegmentIntent;
  },

  async handle(handlerInput: HandlerInput): Promise<Response> {
    try {
      const chosenActionDescription = getSlotValue(handlerInput.requestEnvelope, SlotsName.actionName);
      const { actions, currentStory } = getSessionAttributes(handlerInput);

      const chosenAction = actions?.find(
        (action) => action.description.toLowerCase() === chosenActionDescription?.toLowerCase(),
      );

      if (!chosenAction) {
        // Delete actions attribute to avoid conflict
        deleteSessionAttributes(handlerInput, ['actions']);

        return narrateSegment(handlerInput);
      }

      // Set step and next idSegment
      const isSuccess = calculateSuccess(chosenAction.successRate);

      const idNextSegment = isSuccess ? chosenAction.idSegmentSuccess : chosenAction.idSegmentFailure;

      if (!idNextSegment) throw new Error('idNextSegment not set on session');
      if (!currentStory) throw new Error('currentStory not set on session');

      setSessionAttributes(handlerInput, {
        idSegment: idNextSegment,
        step: IntentName.NarrateSegmentIntent,
      });

      const idAmazon = getUserId(handlerInput.requestEnvelope);
      await UserProgressApi.updateProgress(idAmazon, { idStory: currentStory.id, idNewSegment: idNextSegment });

      return narrateSegment(handlerInput);
    } catch (err: any) {
      console.log(err);
      return handlerInput.responseBuilder.speak(err.message).getResponse();
    }
  },
};
