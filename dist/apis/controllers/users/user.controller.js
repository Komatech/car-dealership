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
exports.UserController = void 0;
const http_response_dto_1 = require("@app/apis/dto/http-response.dto");
const tokens_1 = require("@app/container/tokens");
const users_service_1 = require("@app/modules/users/users.service");
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const pagination_1 = require("@app/apis/dto/pagination");
const validation_middleware_1 = require("@app/apis/middlewares/validation.middleware");
const id_dto_1 = require("@app/apis/dto/id.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUser(req, paginate) {
        const user = await this.userService.paginate({}, { page: paginate.page, limit: paginate.limit }, { exclude: "password" });
        return new http_response_dto_1.SuccessResponseDto({ data: user });
    }
    async getOneUser(req, { id }) {
        const user = await this.userService.findById(id, { exclude: "password" });
        return new http_response_dto_1.SuccessResponseDto({ data: user });
    }
};
exports.UserController = UserController;
__decorate([
    (0, inversify_express_utils_1.httpGet)("/", tokens_1.MIDDLEWARE_TOKENS.AuthMiddleware, (0, validation_middleware_1.validationPipe)(pagination_1.PaginationDto, "query")),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.queryParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, pagination_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/:id", tokens_1.MIDDLEWARE_TOKENS.AuthMiddleware, (0, validation_middleware_1.validationPipe)(id_dto_1.IdDto, "params")),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.requestParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, id_dto_1.IdDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getOneUser", null);
exports.UserController = UserController = __decorate([
    (0, inversify_express_utils_1.controller)("/api/user"),
    __param(0, (0, inversify_1.inject)(tokens_1.SERVICE_TOKENS.UserService)),
    __metadata("design:paramtypes", [users_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map