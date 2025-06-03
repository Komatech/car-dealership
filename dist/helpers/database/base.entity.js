"use strict";
// utils/SchemaFactory.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaFactory = void 0;
const mongoose_1 = require("mongoose");
class SchemaFactory {
    static create(fields, options = {}) {
        if (Object.keys(fields).length === 0) {
            throw new Error("Cannot create schema from empty schema definition");
        }
        return new mongoose_1.Schema(Object.assign(Object.assign({}, fields), this.baseFields), Object.assign(Object.assign({}, this.defaultOptions), options));
    }
}
exports.SchemaFactory = SchemaFactory;
SchemaFactory.defaultOptions = {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
    versionKey: false,
    toObject: {
        virtuals: true,
        getters: true,
    },
    toJSON: {
        virtuals: true,
        getters: true,
    },
};
SchemaFactory.baseFields = {
    deletedAt: { type: mongoose_1.SchemaTypes.Date },
};
//# sourceMappingURL=base.entity.js.map