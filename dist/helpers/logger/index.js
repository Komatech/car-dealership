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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const bunyan_1 = __importStar(require("bunyan"));
class Logger {
    constructor(config) {
        if (config instanceof bunyan_1.default) {
            this.logger = config;
        }
        else {
            this.logger = new bunyan_1.default({
                name: config.name,
                serializers: config.serializers,
                streams: [
                    {
                        stream: config.buffer || process.stdout,
                        level: config.verbose === false ? bunyan_1.ERROR : bunyan_1.INFO,
                        type: !!config.buffer ? 'raw' : 'stream',
                    },
                ],
            });
        }
    }
    /**
     * Create a child logger with labels to annotate it as such
     * @param labels annotation of new sub logger
     */
    child(labels) {
        return new Logger(this.logger.child(labels));
    }
    /**
     * Logs an incoming HTTP request
     * @param req Express request
     */
    request(req) {
        this.logger.info({ req });
    }
    /**
     * Logs an outgoing HTTP response
     * @param req Express request
     * @param res Express responser
     */
    response(req, res) {
        this.logger.info({ res, req });
    }
    /**
     * Logs an error that occured during the handling of an HTTP request
     * @param err Error object
     * @param req express request
     * @param res express responser
     */
    httpError(err, req, res) {
        this.logger.error({ err, res, req });
    }
    log(entry, metadata) {
        if (typeof entry === 'string' && metadata) {
            this.logger.info(metadata, entry);
        }
        else {
            this.logger.info(entry);
        }
    }
    error(err, extras) {
        if (typeof extras === 'string') {
            this.logger.error(err, extras);
        }
        else {
            this.logger.error(Object.assign({ err }, extras));
        }
    }
}
exports.Logger = Logger;
//# sourceMappingURL=index.js.map