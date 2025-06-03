import { SchemaFactory } from "@app/helpers/database/base.entity";
import { Types } from "mongoose";

const carSchema = SchemaFactory.create({
  brand: { type: String, required: true },
  carModel: { type: String, required: true },
  year: { type: Number, required: true},
  price: { type: Number, required: true },
  mileage: { type: Number, required: false},
  available: { type: Boolean, default: false },
  category: { type: Types.ObjectId, ref: "Category" },
  imageUrls: [String],
});

export default carSchema