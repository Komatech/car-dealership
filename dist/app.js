"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const inversify_express_utils_1 = require("inversify-express-utils");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const lodash_1 = require("lodash");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const response_time_1 = __importDefault(require("response-time"));
const tokens_1 = require("@app/container/tokens");
const global_error_middleware_1 = require("@app/apis/middlewares/global-error.middleware");
const request_logging_middleware_1 = require("@app/apis/middlewares/request-logging.middleware");
class App {
    constructor(container, logger) {
        const env = container.get(tokens_1.MODULE_TOKENS.Env);
        const opts = [null, null, false];
        this.server = new inversify_express_utils_1.InversifyExpressServer(container, null, {
            rootPath: '/',
        }, ...opts);
        this.server.setConfig((app) => {
            app.disable('x-powered-by');
            app.use(express_1.default.json());
            app.use(express_1.default.urlencoded({ extended: true }));
            app.use((0, cors_1.default)());
            app.options('*', (0, cors_1.default)());
            app.use((0, helmet_1.default)());
            app.use((0, response_time_1.default)());
            app.use((0, request_logging_middleware_1.attachRequestId)());
            app.use((0, request_logging_middleware_1.logRequest)(logger));
            app.use(request_logging_middleware_1.captureBody);
            app.use((0, request_logging_middleware_1.logResponse)(logger));
        });
        this.server.setErrorConfig((app) => {
            app.get('/api/health', async (_req, res) => {
                try {
                    // await healthCheck();
                    res
                        .status(http_status_codes_1.default.OK)
                        .json({ status: true, message: `${(0, lodash_1.capitalize)(env.get('NODE_ENV'))} is up and running 🚀` });
                }
                catch (err) {
                    res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).send(err.message);
                }
            });
            app.use((_req, res, _next) => {
                const err = `Cannot ${_req.method.toUpperCase()} ${_req.path}`;
                res.status(http_status_codes_1.default.NOT_FOUND).json({ status: false, message: err });
            });
            app.use((0, global_error_middleware_1.globalErrorMiddleware)(logger, env));
        });
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map