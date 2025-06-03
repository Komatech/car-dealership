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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const tokens_1 = require("@app/container/tokens");
const users_service_1 = require("@app/modules/users/users.service");
const validation_middleware_1 = require("@app/apis/middlewares/validation.middleware");
const http_status_codes_1 = require("http-status-codes");
const http_response_dto_1 = require("@app/apis/dto/http-response.dto");
const errors_1 = require("@app/helpers/errors");
const jwt_1 = require("@app/helpers/jwt");
const bcrypt_utils_1 = require("@app/utils/bcrypt-utils");
const login_dto_1 = require("@app/apis/controllers/auth/dtos/login.dto");
const signup_dto_1 = require("./dtos/signup.dto");
let AuthController = class AuthController {
    constructor(jwt, userService) {
        this.jwt = jwt;
        this.userService = userService;
    }
    async Signup(res, payload) {
        try {
            await this.userService.create({
                firstName: payload.firstName,
                lastName: payload.lastName,
                email: payload.email,
                password: await (0, bcrypt_utils_1.hashPassword)(payload.password)
            });
            return res.status(http_status_codes_1.StatusCodes.CREATED).send(new http_response_dto_1.SuccessResponseDto());
        }
        catch (error) {
            if (error.code === 11000) {
                throw new errors_1.ApplicationError(http_status_codes_1.StatusCodes.CONFLICT, "Email taken already");
            }
            throw new errors_1.ApplicationError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error");
        }
    }
    async login(res, payload) {
        const user = await this.userService.getByEmail(payload.email);
        if (user == null) {
            throw new errors_1.ApplicationError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid email address or password");
        }
        const isPassword = await (0, bcrypt_utils_1.verifyPassword)(payload.password, user.password);
        if (!isPassword) {
            throw new errors_1.ApplicationError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid email address or password");
        }
        const auth_token = await this.jwt.signAsync({ id: user.id, tokenType: "access" }, { expiresIn: "30min" });
        return new http_response_dto_1.SuccessResponseDto({ data: { auth_token } });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, inversify_express_utils_1.httpPost)("/signup", (0, validation_middleware_1.validationPipe)(signup_dto_1.SignupDto)),
    __param(0, (0, inversify_express_utils_1.response)()),
    __param(1, (0, inversify_express_utils_1.requestBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, signup_dto_1.SignupDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "Signup", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)("/login", (0, validation_middleware_1.validationPipe)(login_dto_1.LoginDto)),
    __param(0, (0, inversify_express_utils_1.response)()),
    __param(1, (0, inversify_express_utils_1.requestBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, inversify_express_utils_1.controller)("/api/auth"),
    __param(0, (0, inversify_1.inject)(tokens_1.MODULE_TOKENS.Jwt)),
    __param(1, (0, inversify_1.inject)(tokens_1.SERVICE_TOKENS.UserService)),
    __metadata("design:paramtypes", [jwt_1.Jwt,
        users_service_1.UserService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map