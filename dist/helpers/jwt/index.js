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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jwt = void 0;
exports.encode = encode;
exports.decode = decode;
const jwt = __importStar(require("jsonwebtoken"));
const inversify_1 = require("inversify");
const tokens_1 = require("@app/container/tokens");
/**
 * Sign data as a JWT token
 * @param secret secret for signing
 * @param timeout how long before the JWT expires. This is intentionally required
 * @param data data to encode
 * @returns signed JWT token
 */
function encode(secret, timeout, data) {
    return jwt.sign({ 'urn:custom:claim': data }, secret, {
        algorithm: 'HS256',
        expiresIn: timeout,
    });
}
/**
 * Verifies and decodes tokens signed using `encode`.
 * @param secret secret used to sign
 * @param token token to be verified
 * @returns the claims
 */
function decode(secret, token) {
    const payload = jwt.verify(token, secret);
    return payload['urn:custom:claim'];
}
let Jwt = class Jwt {
    constructor(options) {
        this.options = options;
    }
    sign(payload, options) {
        const signOptions = this.mergeJwtOptions(Object.assign({}, options), 'signOptions');
        const secret = this.getSecretKey(options, 'privateKey');
        const allowedSignOptKeys = ['secret', 'privateKey'];
        const signOptKeys = Object.keys(signOptions);
        if (typeof payload === 'string' &&
            signOptKeys.some((k) => !allowedSignOptKeys.includes(k))) {
            throw new Error('Payload as string is not allowed with the following sign options: ' +
                signOptKeys.join(', '));
        }
        return jwt.sign(payload, secret, signOptions);
    }
    signAsync(payload, options) {
        const signOptions = this.mergeJwtOptions(Object.assign({}, options), 'signOptions');
        const secret = this.getSecretKey(options, 'privateKey');
        const allowedSignOptKeys = ['secret', 'privateKey'];
        const signOptKeys = Object.keys(signOptions);
        if (typeof payload === 'string' &&
            signOptKeys.some((k) => !allowedSignOptKeys.includes(k))) {
            throw new Error('Payload as string is not allowed with the following sign options: ' +
                signOptKeys.join(', '));
        }
        return new Promise((resolve, reject) => Promise.resolve()
            .then(() => secret)
            .then((scrt) => {
            jwt.sign(payload, scrt, signOptions, (err, encoded) => err ? reject(err) : resolve(encoded));
        }));
    }
    verify(token, options) {
        const verifyOptions = this.mergeJwtOptions(Object.assign({}, options), 'verifyOptions');
        const secret = this.getSecretKey(options, 'publicKey');
        return jwt.verify(token, secret, verifyOptions);
    }
    verifyAsync(token, options) {
        const verifyOptions = this.mergeJwtOptions(Object.assign({}, options), 'verifyOptions');
        const secret = this.getSecretKey(options, 'publicKey');
        return new Promise((resolve, reject) => Promise.resolve()
            .then(() => secret)
            .then((scrt) => {
            jwt.verify(token, scrt, verifyOptions, (err, decoded) => err ? reject(err) : resolve(decoded));
        })
            .catch(reject));
    }
    decode(token, options) {
        return jwt.decode(token, options);
    }
    mergeJwtOptions(options, key) {
        delete options.secret;
        if (key === 'signOptions') {
            delete options.privateKey;
        }
        else {
            delete options.publicKey;
        }
        return options
            ? Object.assign(Object.assign({}, (this.options[key] || {})), options) : (this.options[key] || {});
    }
    getSecretKey(options, key) {
        var _a;
        const secret = (options === null || options === void 0 ? void 0 : options.secret) ||
            ((_a = this.options) === null || _a === void 0 ? void 0 : _a.secret) ||
            (key === 'privateKey'
                ? (options === null || options === void 0 ? void 0 : options.privateKey) || this.options.privateKey
                : (options === null || options === void 0 ? void 0 : options.publicKey) || this.options.publicKey) ||
            this.options[key];
        if (!secret) {
            throw new Error(`JWT ${key} is not defined`);
        }
        return secret;
    }
};
exports.Jwt = Jwt;
exports.Jwt = Jwt = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(tokens_1.OPTIONS_TOKENS.JwtOptions)),
    __metadata("design:paramtypes", [Object])
], Jwt);
//# sourceMappingURL=index.js.map