"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DtoValidationError = exports.validateDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const merge_1 = __importDefault(require("lodash/merge"));
const reduce_1 = __importDefault(require("lodash/reduce"));
const trim_1 = __importDefault(require("lodash/trim"));
const baseValidatorOptions = {
    whitelist: true,
    stopAtFirstError: true,
};
const validateDto = (value, dtoClass, options = {}) => {
    const object = (0, class_transformer_1.plainToInstance)(dtoClass, value);
    options = (0, merge_1.default)(baseValidatorOptions, options);
    const errors = (0, class_validator_1.validateSync)(object, options);
    if (errors.length > 0) {
        throw new DtoValidationError(errors);
    }
    return object;
};
exports.validateDto = validateDto;
class DtoValidationError extends Error {
    constructor(errors) {
        super('validation error');
        this.messages = {};
        this.messages = errors.reduce((accum, err) => {
            accum[err.property] = (0, trim_1.default)((0, reduce_1.default)(err.constraints, (result, msg, _key) => {
                return result.concat(msg).concat(' ');
            }, ''));
            return accum;
        }, {});
    }
}
exports.DtoValidationError = DtoValidationError;
//# sourceMappingURL=validator-utils.js.map