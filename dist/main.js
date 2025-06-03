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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = bootstrap;
require("module-alias/register");
require("reflect-metadata");
require("./apis/controllers");
const http = __importStar(require("http"));
const tokens_1 = require("@app/container/tokens");
const app_1 = require("./app");
const container_1 = require("@app/container/container");
const inversify_express_utils_1 = require("inversify-express-utils");
const log_routes_1 = require("@app/utils/log-routes");
const process_1 = __importDefault(require("process"));
async function bootstrap() {
    const container = await (0, container_1.configureAppContainer)();
    const env = container.get(tokens_1.MODULE_TOKENS.Env);
    const logger = container.get(tokens_1.MODULE_TOKENS.Logger);
    const app = new app_1.App(container, logger);
    const appServer = app.server.build();
    const routeInfo = (0, inversify_express_utils_1.getRouteInfo)(container);
    (0, log_routes_1.logRoutes)(routeInfo, logger);
    const httpServer = http.createServer(appServer);
    httpServer.listen(env.get('PORT'));
    httpServer.on('listening', () => {
        logger.log(`listening on port ${env.get('PORT')} 🚀`);
    });
    process_1.default.on('SIGTERM', async () => {
        logger.log('exiting application...');
        httpServer.close(() => {
            process_1.default.exit(0);
        });
    });
}
bootstrap();
//# sourceMappingURL=main.js.map