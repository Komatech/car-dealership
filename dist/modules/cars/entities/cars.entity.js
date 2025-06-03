"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_entity_1 = require("@app/helpers/database/base.entity");
const mongoose_1 = require("mongoose");
const carSchema = base_entity_1.SchemaFactory.create({
    brand: { type: String, required: true },
    carModel: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    mileage: { type: Number, required: false },
    available: { type: Boolean, default: false },
    category: { type: mongoose_1.Types.ObjectId, ref: "Category" },
    imageUrls: [String],
});
exports.default = carSchema;
//# sourceMappingURL=cars.entity.js.map