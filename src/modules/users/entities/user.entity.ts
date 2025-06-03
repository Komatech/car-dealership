import { SchemaFactory } from '@app/helpers/database/base.entity';

const UserSchema = SchemaFactory.create({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'manager'], default: 'manager' },
});

export default UserSchema;