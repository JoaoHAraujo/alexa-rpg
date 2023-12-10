/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import 'module-alias';
import './controllers/_index';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import httpStatus from 'http-status';
import { decorate, injectable } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';
import { InversifyExpressServer } from 'inversify-express-utils';
import swaggerUi from 'swagger-ui-express';
import { Controller } from 'tsoa';

import { RegisterRoutes } from '../build-tsoa/routes';
import { Environment, getEnv } from './constants';
import { configDependencies } from './utils/container-binders';
import { requestErrorHandler } from './utils/request-error-handler';

const constantsEnv = getEnv();

const container = configDependencies();
let apiServer: Application;
decorate(injectable(), Controller);

export class Server {
  constructor() {
    this.createServer();
  }

  createServer(): void {
    container.load(buildProviderModule());
    const server: InversifyExpressServer = new InversifyExpressServer(container);

    server.setConfig((app) => {
      app.use(express.urlencoded({ parameterLimit: 5, extended: true }));
      app.use(express.json({ limit: '1mb' }));
      app.use(helmet());

      app.use(cors({ origin: '*' }));

      if (constantsEnv?.env === Environment.DEV) {
        app.use('/docs', swaggerUi.serve, async (_req: Request, res: Response) => {
          return res.send(swaggerUi.generateHTML(await import('../build-tsoa/swagger.json')));
        });
      }

      RegisterRoutes(app);
    });

    server.setErrorConfig((app): void => {
      // catch 404 and forward to error handler
      app.use((_req: Request, res: Response): void => {
        res.status(httpStatus.NOT_FOUND).json();
      });

      app.use((err: any, req: Request, res: Response, _next: NextFunction): void => requestErrorHandler(err, req, res));
    });

    apiServer = server.build();
    apiServer.listen(constantsEnv?.port ?? 3000, () => {
      console.log(`${constantsEnv?.appName} [ONLINE] on port: ${constantsEnv?.port}`);
    });
  }
}

export { container as iocContainer };
