import { getRequestType, getSlotValue, getUserId, HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

import { SegmentApi } from '../../api/segment';
import { IntentName, SlotsName, SlotsType } from '../../enums';
import { calculateSuccess } from '../../helpers/calculate-success';
import { generateDirective } from '../../helpers/generate-directives';
import { getListPrompt } from '../../helpers/get-list-prompt';
import { deleteSessionAttributes, getSessionAttributes, setSessionAttributes } from '../../helpers/session-attributes';
import { TSegmentModel } from '../../models';

const narrateSegment = async (handlerInput: HandlerInput): Promise<Response> => {
  const idAmazon = getUserId(handlerInput.requestEnvelope);
  const { idSegment } = getSessionAttributes(handlerInput);

  if (!idAmazon) throw new Error('idAmazon not defined');

  if (!idSegment) throw new Error('idSegment not defined');

  const segment = await SegmentApi.getById(idAmazon, idSegment);

  if (!segment) throw new Error('Segment not found');

  return promptActionChoice(handlerInput, segment);
};

const promptActionChoice = (handlerInput: HandlerInput, segment: TSegmentModel): Response => {
  let actionPrompt = '';
  const responseBuilder = handlerInput.responseBuilder;

  if (segment.actions?.length) {
    setSessionAttributes(handlerInput, { actions: segment.actions, isStoryFinished: false });

    const actionDescriptions = segment.actions?.map((action) => action.description);

    const actionNameDirectives = generateDirective(SlotsType.ActionNameType, actionDescriptions);

    actionPrompt = `O que deseja fazer? ${getListPrompt(actionDescriptions)}`;

    responseBuilder.addDirective(actionNameDirectives);
  } else {
    setSessionAttributes(handlerInput, { isStoryFinished: true });

    responseBuilder.withShouldEndSession(true); // TODO chamar handler de encerramento de skill (customizar)
  }

  const speechText = `${segment.narrative}. ${actionPrompt}`;

  responseBuilder.speak(speechText);

  if (segment.actions?.length) {
    responseBuilder.reprompt(`Não entendi. ${speechText}`).getResponse();
  }

  return responseBuilder.getResponse();
};

export const NarrateSegmentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const { step, isStoryFinished } = getSessionAttributes(handlerInput);

    return (
      getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      step === IntentName.NarrateSegmentIntent &&
      !isStoryFinished
    );
  },

  async handle(handlerInput: HandlerInput): Promise<Response> {
    try {
      const chosenActionDescription = getSlotValue(handlerInput.requestEnvelope, SlotsName.actionName);
      const { actions } = getSessionAttributes(handlerInput);

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

      setSessionAttributes(handlerInput, {
        idSegment: isSuccess ? chosenAction.idSegmentSuccess : chosenAction.idSegmentFailure,
        step: IntentName.NarrateSegmentIntent,
      });

      // TODO chamar api para salvar progresso

      return narrateSegment(handlerInput);
    } catch (err: any) {
      console.log(err);
      return handlerInput.responseBuilder.speak(err.message).getResponse();
    }
  },
};
