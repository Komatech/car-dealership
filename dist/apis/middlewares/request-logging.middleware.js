"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachRequestId = attachRequestId;
exports.captureBody = captureBody;
exports.logRequest = logRequest;
exports.logResponse = logResponse;
const crypto = __importStar(require("crypto"));
/**
 * @description - Attaches a unique identifier to every request
 * @param generator function to generate id
 * @param headerName name of header to append to response
 * @param setHeader whether to add request id to header or not
 * @param tag name of attribute to keep id in request object (default: `"id"`)
 */
function attachRequestId({ generator = (_request) => crypto.randomUUID(), headerName = 'x-request-id', setHeader = true, tag = 'id', } = {}) {
    return function (req, res, next) {
        const oldValue = req.get(headerName);
        const id = oldValue === undefined ? generator(req) : oldValue;
        if (setHeader) {
            res.set(headerName, id);
        }
        req[tag] = id;
        next();
    };
}
/**
 * Captures and stores the body of the response in `Request.locals.body` whenever
 * `Response.json` is called
 * @param req express request
 * @param res express response
 * @param next nextFunction middleware function
 */
function captureBody(req, res, next) {
    const json = res.json;
    res.json = function (body) {
        res.locals.body =
            body instanceof Buffer ? JSON.parse(body.toString()) : body;
        return json.call(this, body);
    };
    next();
}
function hasUserAgent(req, ignore) {
    const userAgent = req.headers['user-agent'];
    if (typeof userAgent !== 'string')
        return false;
    return ignore.some((pattern) => pattern.test(userAgent));
}
/**
 * Create middleware to log requests
 * @param logger internal logger
 * @param ignore user agents of requests to ignore
 */
function logRequest(logger, ignore = []) {
    return function (req, _res, next) {
        // ignore some user agents
        if (hasUserAgent(req, ignore)) {
            return next();
        }
        logger.request(req);
        next();
    };
}
/**
 * Create middleware to log response
 * @param logger internal logger
 */
function logResponse(logger) {
    return (req, res, next) => {
        res.on('close', () => {
            logger.response(req, res);
        });
        next();
    };
}
//# sourceMappingURL=request-logging.middleware.js.map