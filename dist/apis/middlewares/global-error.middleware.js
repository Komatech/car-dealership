"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorMiddleware = globalErrorMiddleware;
const errors_1 = require("@app/helpers/errors");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const enums_1 = require("@app/helpers/enums");
/**
 * Middleware for automatically interpreting `ApplicationError` and `APIError`. It responsds
 * with `INTERNAL_SERVER_ERROR` if the error is not one of either.
 * @param logger octonet logger
 */
function globalErrorMiddleware(logger, env) {
    return function (err, req, res, next) {
        var _a;
        // handling for asynchronous situations where error is thrown after response has been sent
        if (res.headersSent)
            return next(err);
        if (err instanceof errors_1.ApplicationError) {
            res.status(err.code).json({ message: err.message, data: err.data });
        }
        else {
            if (env.get('NODE_ENV') != enums_1.AppEnv.PRODUCTION) {
                res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({ message: (_a = err === null || err === void 0 ? void 0 : err.message) !== null && _a !== void 0 ? _a : 'Internal Server Error', data: err === null || err === void 0 ? void 0 : err.body
                });
            }
            else {
                res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    message: 'Internal Server Error',
                });
            }
        }
        logger.httpError(err, req, res);
    };
}
//# sourceMappingURL=global-error.middleware.js.map