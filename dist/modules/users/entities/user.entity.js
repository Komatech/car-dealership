"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_entity_1 = require("@app/helpers/database/base.entity");
const UserSchema = base_entity_1.SchemaFactory.create({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'manager'], default: 'manager' },
});
exports.default = UserSchema;
//# sourceMappingURL=user.entity.js.map