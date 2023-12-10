import { BaseHttpController, interfaces } from 'inversify-express-utils';
import { Body, Get, Post, Route, Tags } from 'tsoa';

import { Environment, getEnv } from '../../constants';
import { DatabaseProvider } from '../../infra/db/config/database';
import { provideSingleton } from '../../utils/provide-singleton';

interface IHealthStatus {
  app: string;
  uptime: number;
  now: string;
  env: Environment;
  databaseOn?: boolean;
}

@Route('v1/health')
@Tags('Health')
@provideSingleton(HealthController)
export class HealthController extends BaseHttpController implements interfaces.Controller {
  startedAt: number;

  constructor() {
    super();
    this.startedAt = new Date().getTime();
  }

  @Get('/status')
  getStatus(): IHealthStatus {
    const response: IHealthStatus = {
      app: getEnv()?.appName,
      uptime: Math.floor(new Date().getTime() - this.startedAt),
      now: new Date().toISOString(),
      env: process.env.NODE_ENV as Environment,
    };

    return response;
  }

  @Get('/status/readiness')
  async statusAll(): Promise<interfaces.IHttpActionResult> {
    interface QueryResult {
      ON: number;
    }

    const dbStatus = (await DatabaseProvider.query('SELECT 1 "ON"')) as QueryResult[];

    const response: IHealthStatus = {
      app: getEnv()?.appName,
      uptime: Math.floor(new Date().getTime() - this.startedAt),
      now: new Date().toISOString(),
      env: process.env.NODE_ENV as Environment,
      databaseOn: !!dbStatus.find((queryResult: QueryResult) => queryResult.ON),
    };

    return this.ok(response);
  }
}
