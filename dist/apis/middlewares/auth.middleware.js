"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const inversify_1 = require("inversify");
const jsonwebtoken_1 = require("jsonwebtoken");
const errors_1 = require("@app/helpers/errors");
const http_status_codes_1 = require("http-status-codes");
const jwt_1 = require("@app/helpers/jwt");
const inversify_express_utils_1 = require("inversify-express-utils");
const tokens_1 = require("@app/container/tokens");
let AuthMiddleware = class AuthMiddleware extends inversify_express_utils_1.BaseMiddleware {
    async handler(req, _res, next) {
        try {
            const authHeader = req.headers['authorization'];
            if (!authHeader || typeof authHeader !== 'string') {
                throw new errors_1.ApplicationError(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'UNAUTHORIZED');
            }
            const token = authHeader.split(' ')[1];
            if (!token) {
                throw new errors_1.ApplicationError(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'UNAUTHORIZED');
            }
            const decoded = await this.jwt.verifyAsync(token, {});
            req.claim = decoded;
            next();
        }
        catch (err) {
            if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                next(new errors_1.ApplicationError(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'TOKEN_EXPIRED'));
            }
            else if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
                next(new errors_1.ApplicationError(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'INVALID_TOKEN'));
            }
            else {
                next(err);
            }
        }
    }
};
exports.AuthMiddleware = AuthMiddleware;
__decorate([
    (0, inversify_1.inject)(tokens_1.MODULE_TOKENS.Jwt),
    __metadata("design:type", jwt_1.Jwt)
], AuthMiddleware.prototype, "jwt", void 0);
exports.AuthMiddleware = AuthMiddleware = __decorate([
    (0, inversify_1.injectable)()
], AuthMiddleware);
//# sourceMappingURL=auth.middleware.js.map