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
  cryptoKey: string;

  jwt: {
    jwtKey: string;
    expiresIn: string;
  };

  database: {
    host: string;
    name: string;
    user: string;
    password: string;
    port: number;
  };
  actionLimit: number;

  constructor(props: { [key: string]: string }) {
    this.env = props.NODE_ENV as Environment;
    this.debug = props.DEBUG === 'true';
    this.appName = props.APP_NAME;
    this.port = parseInt(props.PORT);
    this.cryptoKey = props.CRYPTO_KEY;
    this.jwt = {
      jwtKey: props.JWT_KEY,
      expiresIn: props.JWT_EXPIRATION,
    };

    this.database = {
      host: props.DATABASE_HOST,
      name: props.DATABASE_NAME,
      user: props.DATABASE_USER,
      password: props.DATABASE_PASSWORD,
      port: parseInt(props.DATABASE_PORT),
    };

    this.actionLimit = parseInt(props.ACTION_LIMIT) || 4;
  }
}

let ConstantsEnv: Constants;

export const initializeEnv = (props: any): void => {
  ConstantsEnv = new Constants(props);
};

export const getEnv: () => Constants = (): Constants => ConstantsEnv;
