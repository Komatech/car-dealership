"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDb = connectToDb;
const mongoose_1 = __importDefault(require("mongoose"));
async function connectToDb(env, logger) {
    await mongoose_1.default.connect(env.get('MONGO_URI'));
    logger.log(`Database connected successfully`);
}
//# sourceMappingURL=database.config.js.map