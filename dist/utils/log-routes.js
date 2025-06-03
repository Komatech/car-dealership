"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRoutes = void 0;
const logRoutes = (info, logger) => {
    info.forEach((route) => {
        route.endpoints.forEach((endpoint) => {
            logger.log(`${route.controller} [${endpoint.route}]`);
        });
    });
};
exports.logRoutes = logRoutes;
//# sourceMappingURL=log-routes.js.map