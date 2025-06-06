import { RouteInfo } from 'inversify-express-utils';
import { Logger } from '@app/helpers/logger';

export const logRoutes = (info: RouteInfo[], logger: Logger) => {
  info.forEach((route) => {
    route.endpoints.forEach((endpoint) => {
      logger.log(`${route.controller} [${endpoint.route}]`);
    });
  });
};
