"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
const bcrypt_1 = __importDefault(require("bcrypt"));
async function hashPassword(password, saltOrRound) {
    try {
        const defaultSalt = await bcrypt_1.default.genSalt(5);
        return bcrypt_1.default.hash(password, saltOrRound !== null && saltOrRound !== void 0 ? saltOrRound : defaultSalt);
    }
    catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}
function verifyPassword(password, hashedPassword) {
    try {
        return bcrypt_1.default.compare(password, hashedPassword);
    }
    catch (error) {
        console.error('Error verifying password:', error);
        throw error;
    }
}
//# sourceMappingURL=bcrypt-utils.js.map