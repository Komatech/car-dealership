import { SchemaFactory } from "@app/helpers/database/base.entity";


const categorySchema = SchemaFactory.create({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
});

export default categorySchema;

