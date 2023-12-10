import { join } from 'node:path';
import { DataSource } from 'typeorm';

import { getEnv } from '../../../constants';

export const DatabaseProvider = new DataSource({
  type: 'postgres',
  port: getEnv()?.database?.port ?? 5432,
  maxQueryExecutionTime: 5000,
  uuidExtension: 'uuid-ossp',

  host: getEnv()?.database?.host,
  username: getEnv()?.database?.user,
  password: getEnv()?.database?.password,
  database: getEnv()?.database?.name,

  migrationsRun: true,
  extra: {
    poll: {
      max: 40,
      min: 10,
      acquire: 10000,
      idle: 20000,
    },
  },
  migrationsTransactionMode: 'each',
  synchronize: false,
  logging: !!getEnv()?.debug,
  migrations: [`${join(__dirname, '../migrations/*.{js, ts}')}`],
  entities: [`${join(__dirname, '../entities/*.entity.{js, ts}')}`],
});
