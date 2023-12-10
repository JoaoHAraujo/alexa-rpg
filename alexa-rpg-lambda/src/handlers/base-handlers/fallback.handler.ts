import { RequestHandler, HandlerInput } from "ask-sdk-core";

export const FallbackHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === "IntentRequest" &&
      request.intent.name === "AMAZON.FallbackIntent"
    );
  },
  handle(handlerInput: HandlerInput) {
    const requestAttributes =
      handlerInput.attributesManager.getRequestAttributes();
    return handlerInput.responseBuilder
      .speak(requestAttributes.t("FALLBACK_MESSAGE"))
      .reprompt(requestAttributes.t("FALLBACK_REPROMPT"))
      .getResponse();
  },
};
