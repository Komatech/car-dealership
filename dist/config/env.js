"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Env = exports.IncompleteEnvError = exports.EnvDto = void 0;
const process = __importStar(require("process"));
const dotenv_1 = require("dotenv");
const inversify_1 = require("inversify");
const enums_1 = require("@app/helpers/enums");
const validator_utils_1 = require("@app/utils/validator-utils");
const class_validator_1 = require("class-validator");
class EnvDto {
    constructor() {
        this.NODE_ENV = enums_1.AppEnv.DEVELOPMENT;
        this.PORT = 8000;
        this.MONGO_URI = 'localhost:27071';
    }
}
exports.EnvDto = EnvDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(enums_1.AppEnv),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], EnvDto.prototype, "NODE_ENV", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EnvDto.prototype, "AUTH_JWT_SECRET", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], EnvDto.prototype, "PORT", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], EnvDto.prototype, "MONGO_URI", void 0);
class IncompleteEnvError extends Error {
    constructor(error) {
        super(`Unable to load environment:\n${JSON.stringify(error.messages, null, 2)}`);
    }
}
exports.IncompleteEnvError = IncompleteEnvError;
let Env = class Env {
    constructor() {
        this.validatedEnv = {};
    }
    load() {
        try {
            (0, dotenv_1.configDotenv)();
            this.validatedEnv = (0, validator_utils_1.validateDto)(process.env, EnvDto);
        }
        catch (err) {
            if (err instanceof validator_utils_1.DtoValidationError) {
                throw new IncompleteEnvError(err);
            }
            throw err;
        }
    }
    get(key) {
        var _a;
        if (((_a = this.validatedEnv) === null || _a === void 0 ? void 0 : _a[key]) != null)
            return this.validatedEnv[key];
        return process.env[key];
    }
};
exports.Env = Env;
exports.Env = Env = __decorate([
    (0, inversify_1.injectable)()
], Env);
//# sourceMappingURL=env.js.map