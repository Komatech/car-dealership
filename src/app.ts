import express, { Application } from 'express';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import Status from 'http-status-codes';
import { capitalize } from 'lodash';
import cors from 'cors';
import helmet from 'helmet';
import responseTime from 'response-time';
import { MODULE_TOKENS } from '@app/container/tokens';
import { globalErrorMiddleware } from '@app/apis/middlewares/global-error.middleware';
import {
  attachRequestId,
  captureBody,
  logRequest,
  logResponse,
} from '@app/apis/middlewares/request-logging.middleware';
import { Logger } from '@app/helpers/logger';
import {Env} from "@app/config/env";


export class App {
  readonly server: InversifyExpressServer;

  constructor(
    container: Container,
    logger: Logger,
    // healthCheck = () => Promise.resolve(),
  ) {
    const env = container.get<Env>(MODULE_TOKENS.Env);

    const opts: any = [null, null, false];
    this.server = new InversifyExpressServer(
      container,
      null,
      {
        rootPath: '/',
      },
      ...opts,
    );

    this.server.setConfig((app: Application) => {
      app.disable('x-powered-by');

      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));

      app.use(cors());
      app.options('*', cors());

      app.use(helmet());
      app.use(responseTime());

      app.use(attachRequestId());
      app.use(logRequest(logger));
      app.use(captureBody);
      app.use(logResponse(logger));
    });

    this.server.setErrorConfig((app: Application) => {
      app.get('/api/health', async (_req, res) => {
        try {
        // await healthCheck();
        res
            .status(Status.OK)
            .json({status: true, message: `${capitalize(env.get<string>('NODE_ENV'))} is up and running 🚀`});
        } catch (err) {
        res.status(Status.INTERNAL_SERVER_ERROR).send((err as Error).message);
        }
    });

    app.use((_req, res, _next) => {
        const err = `Cannot ${_req.method.toUpperCase()} ${_req.path}`;
        res.status(Status.NOT_FOUND).json({status: false, message:err});
    });

    app.use(globalErrorMiddleware(logger, env));
    });
  }
}
