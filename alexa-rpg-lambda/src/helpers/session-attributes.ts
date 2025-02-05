import { HandlerInput } from 'ask-sdk-core';

import { IntentName } from '../enums';
import { TStoryModel, TUserProgressModel } from '../models';

export type TSessionAttributesModel = {
  step: IntentName;
  userAge?: number;
  progressStories?: TUserProgressModel[];
  stories?: TStoryModel[];
  currentStory?: TStoryModel;
  choseToContinueStory?: boolean;
};

export function getSessionAttributes(handlerInput: HandlerInput): TSessionAttributesModel {
  return handlerInput.attributesManager.getSessionAttributes<TSessionAttributesModel>();
}

export function setSessionAttributes(handlerInput: HandlerInput, attributes: Partial<TSessionAttributesModel>): void {
  return handlerInput.attributesManager.setSessionAttributes({ ...getSessionAttributes(handlerInput), ...attributes });
}

export function deleteSessionAttributes(
  handlerInput: HandlerInput,
  attributes: Array<keyof TSessionAttributesModel>,
): void {
  const sessionAttributes = getSessionAttributes(handlerInput);

  attributes.forEach((attribute) => delete sessionAttributes[attribute]);
}
