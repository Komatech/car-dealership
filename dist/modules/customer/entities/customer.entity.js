"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_entity_1 = require("@app/helpers/database/base.entity");
const customerSchema = base_entity_1.SchemaFactory.create({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: false, default: '' },
});
exports.default = customerSchema;
//# sourceMappingURL=customer.entity.js.map