"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MIDDLEWARE_TOKENS = exports.OPTIONS_TOKENS = exports.SERVICE_TOKENS = exports.MODULE_TOKENS = void 0;
exports.MODULE_TOKENS = {
    Jwt: Symbol.for("Jwt"),
    Env: Symbol.for("Env"),
    Logger: Symbol.for("Logger"),
    AppDb: Symbol.for("AppDb"),
};
exports.SERVICE_TOKENS = {
    UserService: Symbol.for("UserService"),
    CustomerService: Symbol.for("CustomerService"),
    CategoryService: Symbol.for("CategoryService"),
    CarService: Symbol.for("CarService"),
};
exports.OPTIONS_TOKENS = {
    JwtOptions: Symbol.for('JwtOptions'),
};
exports.MIDDLEWARE_TOKENS = {
    AuthMiddleware: Symbol.for('AuthMiddleware'),
};
//# sourceMappingURL=tokens.js.map