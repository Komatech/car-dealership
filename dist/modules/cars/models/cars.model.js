"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const cars_entity_1 = __importDefault(require("../entities/cars.entity"));
exports.CarModel = mongoose_1.default.model('Cars', cars_entity_1.default);
//# sourceMappingURL=cars.model.js.map