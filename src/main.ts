import 'module-alias/register';
import 'reflect-metadata';
import './apis/controllers';

import * as http from 'http';
import { MODULE_TOKENS } from '@app/container/tokens';
import { Env } from '@app/config/env';
import { App } from './app';
import { Logger } from '@app/helpers/logger';
import { configureAppContainer } from '@app/container/container';
import { getRouteInfo } from 'inversify-express-utils';
import { logRoutes } from '@app/utils/log-routes';
import process from 'process';


export async function bootstrap() {
  const container = await configureAppContainer();

  const env = container.get<Env>(MODULE_TOKENS.Env);
  const logger = container.get<Logger>(MODULE_TOKENS.Logger);

  const app = new App(container, logger);

  const appServer = app.server.build();

  const routeInfo = getRouteInfo(container);

  logRoutes(routeInfo, logger);

  const httpServer = http.createServer(appServer);

  httpServer.listen(env.get<string>('PORT'));

  httpServer.on('listening', () => {
    logger.log(`listening on port ${env.get<string>('PORT')} 🚀`);
  });

  process.on('SIGTERM', async () => {
    logger.log('exiting application...');

    httpServer.close(() => {
      process.exit(0);
    });
  });
}

bootstrap();