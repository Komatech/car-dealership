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
exports.CategoryController = void 0;
const http_response_dto_1 = require("@app/apis/dto/http-response.dto");
const tokens_1 = require("@app/container/tokens");
const category_service_1 = require("@app/modules/category/category.service");
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const pagination_1 = require("@app/apis/dto/pagination");
const validation_middleware_1 = require("@app/apis/middlewares/validation.middleware");
const id_dto_1 = require("@app/apis/dto/id.dto");
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("@app/helpers/errors");
const create_category_dto_1 = require("./dtos/create-category.dto");
const update_category_dto_1 = require("./dtos/update-category.dto");
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async createCategory(res, payload) {
        try {
            await this.categoryService.create({
                name: payload.name,
                description: payload.description
            });
            return res.status(http_status_codes_1.StatusCodes.CREATED).send(new http_response_dto_1.SuccessResponseDto());
        }
        catch (error) {
            if (error.code === 11000) {
                throw new errors_1.ApplicationError(http_status_codes_1.StatusCodes.CONFLICT, "Category already exists");
            }
            throw new errors_1.ApplicationError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error");
        }
    }
    async getCategory(req, paginate) {
        const category = await this.categoryService.paginate({}, { page: paginate.page, limit: paginate.limit });
        return new http_response_dto_1.SuccessResponseDto({ data: category });
    }
    async getOneCategory(req, { id }) {
        const category = await this.categoryService.findById(id);
        return new http_response_dto_1.SuccessResponseDto({ data: category });
    }
    async updateCategory(req, { id }, payload) {
        const category = await this.categoryService.update(id, payload);
        return new http_response_dto_1.SuccessResponseDto({ data: category });
    }
    async deleteOneCategory(req, { id }) {
        await this.categoryService.delete(id);
        return new http_response_dto_1.SuccessResponseDto();
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, inversify_express_utils_1.httpPost)("/", tokens_1.MIDDLEWARE_TOKENS.AuthMiddleware, (0, validation_middleware_1.validationPipe)(create_category_dto_1.CreateCategoryDto)),
    __param(0, (0, inversify_express_utils_1.response)()),
    __param(1, (0, inversify_express_utils_1.requestBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createCategory", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/", tokens_1.MIDDLEWARE_TOKENS.AuthMiddleware, (0, validation_middleware_1.validationPipe)(pagination_1.PaginationDto, "query")),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.queryParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, pagination_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategory", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/:id", tokens_1.MIDDLEWARE_TOKENS.AuthMiddleware, (0, validation_middleware_1.validationPipe)(id_dto_1.IdDto, "params")),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.requestParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, id_dto_1.IdDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getOneCategory", null);
__decorate([
    (0, inversify_express_utils_1.httpPut)("/:id", tokens_1.MIDDLEWARE_TOKENS.AuthMiddleware, (0, validation_middleware_1.validationPipe)(id_dto_1.IdDto, "params"), (0, validation_middleware_1.validationPipe)(update_category_dto_1.UpdateCategoryDto)),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.requestParam)()),
    __param(2, (0, inversify_express_utils_1.requestBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, id_dto_1.IdDto, update_category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategory", null);
__decorate([
    (0, inversify_express_utils_1.httpDelete)("/:id", tokens_1.MIDDLEWARE_TOKENS.AuthMiddleware, (0, validation_middleware_1.validationPipe)(id_dto_1.IdDto, "params")),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.requestParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, id_dto_1.IdDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteOneCategory", null);
exports.CategoryController = CategoryController = __decorate([
    (0, inversify_express_utils_1.controller)("/api/category"),
    __param(0, (0, inversify_1.inject)(tokens_1.SERVICE_TOKENS.CategoryService)),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
//# sourceMappingURL=category.controller.js.map