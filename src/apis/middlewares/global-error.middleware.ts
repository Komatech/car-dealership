import { ApplicationError } from '@app/helpers/errors';
import { NextFunction, Request, Response } from 'express';
import Status from 'http-status-codes';
import { Logger } from '@app/helpers/logger';
import { AppEnv } from '@app/helpers/enums';
import { Env } from '@app/config/env';


/**
 * Middleware for automatically interpreting `ApplicationError` and `APIError`. It responsds
 * with `INTERNAL_SERVER_ERROR` if the error is not one of either.
 * @param logger octonet logger
 */
export function globalErrorMiddleware(logger: Logger, env: Env) {
  return function (err: any, req: Request, res: Response, next: NextFunction) {
    // handling for asynchronous situations where error is thrown after response has been sent
    if (res.headersSent) return next(err);

    if (err instanceof ApplicationError) {
      res.status(err.code).json({ message: err.message, data: err.data });
    } else {
      if (env.get<string>('NODE_ENV') != AppEnv.PRODUCTION){
        res.status(Status.INTERNAL_SERVER_ERROR).json({ message: err?.message ?? 'Internal Server Error', data: err?.body 
        }); 
      } else {
        res.status(Status.INTERNAL_SERVER_ERROR).json({
          message: 'Internal Server Error',
        }); 
      }

    }

    logger.httpError(err, req, res);
  };
}
