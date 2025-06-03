"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrapperError = exports.ApplicationError = void 0;
/**
 * HTTP error codes as classes. This serves as the base class.
 */
class ApplicationError extends Error {
    constructor(code, message, data) {
        super(message);
        this.code = code;
        this.data = data;
    }
}
exports.ApplicationError = ApplicationError;
/**
 * Wraps an internal error so errors middleware can log only internal error
 */
class WrapperError extends Error {
    constructor(code, message, err) {
        super(message);
        this.code = code;
        this.err = err;
    }
}
exports.WrapperError = WrapperError;
//# sourceMappingURL=index.js.map