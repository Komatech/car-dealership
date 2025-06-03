"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_entity_1 = require("@app/helpers/database/base.entity");
const categorySchema = base_entity_1.SchemaFactory.create({
    name: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
});
exports.default = categorySchema;
//# sourceMappingURL=category.entity.js.map