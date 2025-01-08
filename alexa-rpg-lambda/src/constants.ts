/* eslint-disable @typescript-eslint/no-explicit-any */
export enum Environment {
  DEV = 'development',
  HMG = 'homolog',
  PROD = 'production',
}

export class Constants {
  env: 'development' | 'homolog' | 'production';
  debug: boolean;
  appName: string;

  apiKey: string;
  backofficeUrl: string;
  storyLimit: number;

  constructor(props: { [key: string]: string }) {
    this.env = props.NODE_ENV as Environment;
    this.debug = props.DEBUG === 'true';
    this.appName = props.APP_NAME;

    this.apiKey = props.API_KEY;
    this.backofficeUrl = props.BACKOFFICE_URL;
    this.storyLimit = parseInt(props.STORY_LIMIT) ?? 5;
  }
}

let ConstantsEnv: Constants;

export const initializeEnv = (props: any): void => {
  ConstantsEnv = new Constants(props);
};

export const getEnv: () => Constants = (): Constants => ConstantsEnv;
