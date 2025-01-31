export class Constants {
  appName: string;
  backofficeBaseUrl: string;
  listStoryLimit: number;

  constructor(props: { [key: string]: string }) {
    this.appName = props.APP_NAME || 'alexa_rpg_lambda';
    this.backofficeBaseUrl = props.BACKOFFICE_URL;
    this.listStoryLimit = Number(props.LIST_STORY_LIMIT) || 5;
  }
}

export const getEnv: () => Constants = (): Constants => {
  return new Constants({ ...process.env } as { [key: string]: string });
};
