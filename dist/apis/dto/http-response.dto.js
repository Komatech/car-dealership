"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessResponseDto = exports.HttpResponseDto = void 0;
const partial_instantiable_1 = __importDefault(require("@app/utils/partial-instantiable"));
class HttpResponseDto extends partial_instantiable_1.default {
}
exports.HttpResponseDto = HttpResponseDto;
class SuccessResponseDto extends HttpResponseDto {
    constructor() {
        super(...arguments);
        this.message = 'success';
    }
}
exports.SuccessResponseDto = SuccessResponseDto;
//# sourceMappingURL=http-response.dto.js.map