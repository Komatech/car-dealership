"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const category_entity_1 = __importDefault(require("../entities/category.entity"));
exports.CategoryModel = mongoose_1.default.model('Category', category_entity_1.default);
//# sourceMappingURL=category.model.js.map