import { getRequestType, getSlotValue, getUserId, HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

import { StoryApi, UserProgressApi } from '../../api';
import { IntentName, SlotsName, SlotsType } from '../../enums';
import { generateDirective } from '../../helpers/generate-directives';
import { getListPrompt } from '../../helpers/get-list-prompt';
import { deleteSessionAttributes, getSessionAttributes, setSessionAttributes } from '../../helpers/session-attributes';
import { TUserProgressModel } from '../../models';
import { NarrateSegmentHandler } from '../segment';

const defineProgress = async (
  idChosenStory: string,
  idAmazon: string,
  progressStories: TUserProgressModel[],
  continueStory: boolean,
): Promise<{ idSegment: string; idUserProgress: string }> => {
  const userProgress = progressStories.find((progress) => progress.idStory === idChosenStory);

  let idUserProgress: string;
  let idSegment: string;

  if (continueStory) {
    idSegment = userProgress?.idSegment ?? '';
    idUserProgress = userProgress?.id ?? '';

    if (!idSegment) throw new Error('idSegment not defined');
  } else {
    idSegment = (await StoryApi.getById(idAmazon, idChosenStory))?.firstSegment.id ?? '';

    if (!idSegment) throw new Error('idSegment not defined');

    const progress = await UserProgressApi.updateProgress(idAmazon, {
      idStory: idChosenStory,
      idNewSegment: idSegment,
    });

    idUserProgress = progress.id;
  }

  return {
    idSegment,
    idUserProgress,
  };
};

export const ChooseStoryHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return (
      getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      getSessionAttributes(handlerInput).step === IntentName.ChooseStoryIntent
    );
  },

  async handle(handlerInput: HandlerInput): Promise<Response> {
    try {
      const chosenStoryName = getSlotValue(handlerInput.requestEnvelope, SlotsName.storyName);
      const { stories, choseToContinueStory, progressStories } = getSessionAttributes(handlerInput);
      const idAmazon = getUserId(handlerInput.requestEnvelope);

      if (!stories?.length) throw new Error('Stories attribute not set');

      const chosenStory = stories.find((story) => story.title?.toLowerCase() === chosenStoryName?.toLowerCase());

      const continueOrStart = choseToContinueStory ? 'continuar' : 'começar';

      if (!chosenStory) {
        const storyTitles = stories.map((story) => story.title);
        const titlesForPrompt = getListPrompt(storyTitles);

        const storyNameDirective = generateDirective(SlotsType.StoryNameType, storyTitles);

        const baseSpeechText = `Qual das seguintes histórias deseja ${continueOrStart}? ${titlesForPrompt}`;

        return handlerInput.responseBuilder
          .addDirective(storyNameDirective)
          .speak(baseSpeechText)
          .reprompt(`Não entendi. ${baseSpeechText}`)
          .getResponse();
      } else {
        // TODO configurar segmento e levar ao módulo de narração de segmento
        deleteSessionAttributes(handlerInput, ['stories']);

        const { idUserProgress, idSegment } = await defineProgress(
          chosenStory.id,
          idAmazon,
          progressStories ?? [],
          Boolean(choseToContinueStory),
        );

        setSessionAttributes(handlerInput, {
          step: IntentName.NarrateSegmentIntent,
          currentStory: chosenStory,
          idSegment,
          idUserProgress,
        });

        return NarrateSegmentHandler.handle(handlerInput);
      }
    } catch (err: any) {
      console.log(err);
      return handlerInput.responseBuilder.speak(err.message).getResponse();
    }
  },
};
