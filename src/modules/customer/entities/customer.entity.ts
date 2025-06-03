import { SchemaFactory } from "@app/helpers/database/base.entity";

const customerSchema = SchemaFactory.create({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: false, default: '' },
});

export default customerSchema;
