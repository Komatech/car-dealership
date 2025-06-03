import { Request, Response } from 'express';
import unset from 'lodash/unset';

/**
 * Create serializers for common log entries. This entries would
 * be avoided for:
 * - Server log entries requests and responses
 * @param paths paths to not print anywhere
 */
export function defaultSerializers(...paths: string[]) {
  return {
    req: expressRequest(...paths),
    res: expressResponse(...paths),
    err: serializeErr,
  };
}

/*
 * This function dumps long stack traces for exceptions having a cause()
 * method. The error classes from
 * [verror](https://github.com/davepacheco/node-verror) and
 * [restify v2.0](https://github.com/mcavage/node-restify) are examples.
 *
 * Based on `dumpException` in
 * https://github.com/davepacheco/node-extsprintf/blob/master/lib/extsprintf.js
 */
function getFullErrorStack(ex: any) {
  let ret = ex.stack || ex.toString();
  if (ex.cause && typeof ex.cause === 'function') {
    const cex = ex.cause();
    if (cex) {
      ret += '\nCaused by: ' + getFullErrorStack(cex);
    }
  }

  return ret;
}

/**
 * Create serializer that exports the entire error with a
 * custom stack
 * @param err error to serialize
 */
export function serializeErr(err: any) {
  if (!err || !err.stack) return err;
  return {
    stack: getFullErrorStack(err),
    message: err.message,
    name: err.name,
    ...err,
  };
}


/**
 * Create serializer for express requests
 * @param paths sensitive data paths
 */
export function expressRequest(...paths: string[]): (req: Request) => object {
  return (req: Request) => {
    if (!req || !req.socket) return req;

    const log: Record<string, any> = {
      method: req.method,
      url: req.url,
      headers: req.headers,
      params: req.params,
      remoteAddress: req.socket.remoteAddress,
      remotePort: req.socket.remotePort,
    };

    if (req.body && Object.keys(req.body).length !== 0) {
      const logBody = { ...req.body };
      paths.forEach((p) => unset(logBody, p));

      log['body'] = logBody;
    }

    return log;
  };
}

/**
 * Serializer for express responses
 * @param paths sensitive data paths
 */
export function expressResponse(...paths: string[]): (res: Response) => object {
  return (res: Response) => {
    if (!res || !res.statusCode) return res;

    const log: Record<string, any> = {
      statusCode: res.statusCode,
      headers: res.getHeaders(),
    };

    if (res.locals.body && Object.keys(res.locals.body).length !== 0) {
      const logBody = { ...res.locals.body };
      paths.forEach((p) => unset(logBody, p));

      log['body'] = logBody;
    }

    return log;
  };
}
