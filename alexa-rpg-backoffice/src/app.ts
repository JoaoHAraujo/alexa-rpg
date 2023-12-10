/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import { initializeEnv } from './constants';

const loadSecretEnv = async () => {
  dotenv.config();
  initializeEnv({ ...process.env });
};

const initializeDB = async (provider: DataSource) => {
  console.log('Initializing Database');

  await provider.initialize();
  console.log('Initialized Database');
};

(async () => {
  console.log('Initializing env');
  await loadSecretEnv();
  console.log('Initialized env');

  const { DatabaseProvider } = require('./infra/db/config/database');
  await initializeDB(DatabaseProvider);

  console.log('Initializing Server');
  const { Server } = require('./server');
  new Server();
})().catch((err) => console.error(err));
