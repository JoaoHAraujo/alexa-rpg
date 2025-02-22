import { join } from 'node:path';
import { DataSource } from 'typeorm';

import { getEnv } from '../../../constants';

export const DatabaseProvider = new DataSource({
  type: 'postgres',
  maxQueryExecutionTime: 5000,
  uuidExtension: 'uuid-ossp',

  url: getEnv().databaseUrl,

  extra: {
    poll: {
      max: 40,
      min: 10,
      acquire: 10000,
      idle: 20000,
    },
  },

  synchronize: false,
  logging: !!getEnv()?.debug,
  migrationsTransactionMode: 'each',
  migrationsRun: true,
  migrations: [`${join(__dirname, '../migrations/*.{js,ts}')}`],
  entities: [`${join(__dirname, '../entities/*.entity.{js,ts}')}`],
});
