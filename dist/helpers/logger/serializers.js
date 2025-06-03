"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultSerializers = defaultSerializers;
exports.serializeErr = serializeErr;
exports.expressRequest = expressRequest;
exports.expressResponse = expressResponse;
const unset_1 = __importDefault(require("lodash/unset"));
/**
 * Create serializers for common log entries. This entries would
 * be avoided for:
 * - Server log entries requests and responses
 * @param paths paths to not print anywhere
 */
function defaultSerializers(...paths) {
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
function getFullErrorStack(ex) {
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
function serializeErr(err) {
    if (!err || !err.stack)
        return err;
    return Object.assign({ stack: getFullErrorStack(err), message: err.message, name: err.name }, err);
}
/**
 * Create serializer for express requests
 * @param paths sensitive data paths
 */
function expressRequest(...paths) {
    return (req) => {
        if (!req || !req.socket)
            return req;
        const log = {
            method: req.method,
            url: req.url,
            headers: req.headers,
            params: req.params,
            remoteAddress: req.socket.remoteAddress,
            remotePort: req.socket.remotePort,
        };
        if (req.body && Object.keys(req.body).length !== 0) {
            const logBody = Object.assign({}, req.body);
            paths.forEach((p) => (0, unset_1.default)(logBody, p));
            log['body'] = logBody;
        }
        return log;
    };
}
/**
 * Serializer for express responses
 * @param paths sensitive data paths
 */
function expressResponse(...paths) {
    return (res) => {
        if (!res || !res.statusCode)
            return res;
        const log = {
            statusCode: res.statusCode,
            headers: res.getHeaders(),
        };
        if (res.locals.body && Object.keys(res.locals.body).length !== 0) {
            const logBody = Object.assign({}, res.locals.body);
            paths.forEach((p) => (0, unset_1.default)(logBody, p));
            log['body'] = logBody;
        }
        return log;
    };
}
//# sourceMappingURL=serializers.js.map