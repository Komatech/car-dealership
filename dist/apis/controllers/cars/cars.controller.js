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
exports.CarController = void 0;
const http_response_dto_1 = require("@app/apis/dto/http-response.dto");
const tokens_1 = require("@app/container/tokens");
const cars_service_1 = require("@app/modules/cars/cars.service");
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const validation_middleware_1 = require("@app/apis/middlewares/validation.middleware");
const id_dto_1 = require("@app/apis/dto/id.dto");
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("@app/helpers/errors");
const create_car_dto_1 = require("./dtos/create-car.dto");
const update_car_dto_1 = require("./dtos/update-car.dto");
const filter_dto_1 = require("./dtos/filter.dto");
let CarController = class CarController {
    constructor(carService) {
        this.carService = carService;
    }
    async createCar(res, payload) {
        try {
            await this.carService.create({
                brand: payload.brand,
                carModel: payload.carModel,
                year: payload.year,
                price: payload.price,
                mileage: payload.mileage,
                available: payload.available,
                imageUrl: payload.imageUrls,
                category: payload.category
            });
            return res.status(http_status_codes_1.StatusCodes.CREATED).send(new http_response_dto_1.SuccessResponseDto());
        }
        catch (error) {
            if (error.code === 11000) {
                throw new errors_1.ApplicationError(http_status_codes_1.StatusCodes.CONFLICT, "Car already exists");
            }
            throw new errors_1.ApplicationError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error");
        }
    }
    async getCar(req, paginate) {
        try {
            const filter = this.carService.dtoToCarFilter(paginate);
            const car = await this.carService.paginate(filter, { page: paginate.page, limit: paginate.limit });
            return new http_response_dto_1.SuccessResponseDto({ data: car });
        }
        catch (error) {
            throw new errors_1.ApplicationError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error");
        }
    }
    async getOneCar(req, { id }) {
        try {
            const car = await this.carService.findById(id);
            return new http_response_dto_1.SuccessResponseDto({ data: car });
        }
        catch (error) {
            throw new errors_1.ApplicationError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error");
        }
    }
    async updateCar(req, { id }, payload) {
        try {
            const car = await this.carService.update(id, payload);
            return new http_response_dto_1.SuccessResponseDto({ data: car });
        }
        catch (error) {
            throw new errors_1.ApplicationError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error");
        }
    }
    async deleteOneCar(req, { id }) {
        try {
            await this.carService.delete(id);
            return new http_response_dto_1.SuccessResponseDto();
        }
        catch (error) {
            throw new errors_1.ApplicationError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error");
        }
    }
};
exports.CarController = CarController;
__decorate([
    (0, inversify_express_utils_1.httpPost)("/", tokens_1.MIDDLEWARE_TOKENS.AuthMiddleware, (0, validation_middleware_1.validationPipe)(create_car_dto_1.CreateCarDto)),
    __param(0, (0, inversify_express_utils_1.response)()),
    __param(1, (0, inversify_express_utils_1.requestBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_car_dto_1.CreateCarDto]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "createCar", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/", tokens_1.MIDDLEWARE_TOKENS.AuthMiddleware, (0, validation_middleware_1.validationPipe)(filter_dto_1.CarPaginationDto, "query")),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.queryParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, filter_dto_1.CarPaginationDto]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "getCar", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/:id", tokens_1.MIDDLEWARE_TOKENS.AuthMiddleware, (0, validation_middleware_1.validationPipe)(id_dto_1.IdDto, "params")),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.requestParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, id_dto_1.IdDto]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "getOneCar", null);
__decorate([
    (0, inversify_express_utils_1.httpPut)("/:id", tokens_1.MIDDLEWARE_TOKENS.AuthMiddleware, (0, validation_middleware_1.validationPipe)(id_dto_1.IdDto, "params"), (0, validation_middleware_1.validationPipe)(update_car_dto_1.UpdateCarDto)),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.requestParam)()),
    __param(2, (0, inversify_express_utils_1.requestBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, id_dto_1.IdDto, update_car_dto_1.UpdateCarDto]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "updateCar", null);
__decorate([
    (0, inversify_express_utils_1.httpDelete)("/:id", tokens_1.MIDDLEWARE_TOKENS.AuthMiddleware, (0, validation_middleware_1.validationPipe)(id_dto_1.IdDto, "params")),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.requestParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, id_dto_1.IdDto]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "deleteOneCar", null);
exports.CarController = CarController = __decorate([
    (0, inversify_express_utils_1.controller)("/api/cars"),
    __param(0, (0, inversify_1.inject)(tokens_1.SERVICE_TOKENS.CarService)),
    __metadata("design:paramtypes", [cars_service_1.CarService])
], CarController);
//# sourceMappingURL=cars.controller.js.map