"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationPipe = validationPipe;
const errors_1 = require("@app/helpers/errors");
const http_status_codes_1 = require("http-status-codes");
const validator_utils_1 = require("@app/utils/validator-utils");
function validationPipe(dtoClass, context = 'body', validatorOptions = {}) {
    return (req, _res, next) => {
        try {
            const value = req[context];
            req[context] = (0, validator_utils_1.validateDto)(value, dtoClass, validatorOptions);
            next();
        }
        catch (err) {
            if (err instanceof validator_utils_1.DtoValidationError) {
                const message = context === 'body'
                    ? 'Invalid request body'
                    : 'Invalid query parameters';
                throw new errors_1.ApplicationError(http_status_codes_1.StatusCodes.BAD_REQUEST, message, err.messages);
            }
            throw err;
        }
    };
}
//# sourceMappingURL=validation.middleware.js.map