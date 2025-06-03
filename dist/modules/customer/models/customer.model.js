"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const customer_entity_1 = __importDefault(require("../entities/customer.entity"));
exports.CustomerModel = mongoose_1.default.model('Customers', customer_entity_1.default);
//# sourceMappingURL=customer.model.js.map