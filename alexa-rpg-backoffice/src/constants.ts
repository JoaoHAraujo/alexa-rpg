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
  port: number;

  database: {
    host: string;
    name: string;
    user: string;
    password: string;
    port: number;
  };

  constructor(props: { [key: string]: string }) {
    this.env = props.NODE_ENV as Environment;
    this.debug = props.DEBUG === 'true';
    this.appName = props.APP_NAME;
    this.port = parseInt(props.PORT, 10);

    this.database = {
      host: props.DATABASE_HOST,
      name: props.DATABASE_NAME,
      user: props.DATABASE_USER,
      password: props.DATABASE_PASSWORD,
      port: parseInt(props.DATABASE_PORT, 10),
    };
  }
}

let ConstantsEnv: Constants;

export const initializeEnv = (props: any): void => {
  ConstantsEnv = new Constants(props);
};

export const getEnv: () => Constants = (): Constants => ConstantsEnv;
