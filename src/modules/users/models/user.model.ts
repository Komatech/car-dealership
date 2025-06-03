import mongoose, { Document } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import UserSchema from '../entities/user.entity';

export interface UserDocument extends IUser, Document {}

export const UserModel = mongoose.model<UserDocument>('Users', UserSchema);