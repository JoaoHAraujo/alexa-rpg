import { SkillBuilders } from 'ask-sdk-core';

export const handler = SkillBuilders.custom().addRequestHandlers().addErrorHandlers().lambda();
