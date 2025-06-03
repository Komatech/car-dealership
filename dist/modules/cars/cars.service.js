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
exports.CarService = void 0;
const repository_1 = require("@app/helpers/database/repository");
const cars_model_1 = require("./models/cars.model");
const inversify_1 = require("inversify");
let CarService = class CarService extends repository_1.BaseRepository {
    constructor() {
        super(cars_model_1.CarModel);
    }
    dtoToCarFilter(dto) {
        const filter = {};
        if (dto.brand)
            filter.brand = dto.brand;
        if (dto.carModel)
            filter.carModel = dto.carModel;
        if (dto.available !== undefined)
            filter.available = dto.available;
        if (dto.category)
            filter.category = dto.category;
        if (dto.yearGte || dto.yearLte) {
            filter.year = {};
            if (dto.yearGte !== undefined)
                filter.year.$gte = dto.yearGte;
            if (dto.yearLte !== undefined)
                filter.year.$lte = dto.yearLte;
        }
        if (dto.priceGte || dto.priceLte) {
            filter.price = {};
            if (dto.priceGte !== undefined)
                filter.price.$gte = dto.priceGte;
            if (dto.priceLte !== undefined)
                filter.price.$lte = dto.priceLte;
        }
        if (dto.mileageGte || dto.mileageLte) {
            filter.mileage = {};
            if (dto.mileageGte !== undefined)
                filter.mileage.$gte = dto.mileageGte;
            if (dto.mileageLte !== undefined)
                filter.mileage.$lte = dto.mileageLte;
        }
        return filter;
    }
};
exports.CarService = CarService;
exports.CarService = CarService = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], CarService);
//# sourceMappingURL=cars.service.js.map