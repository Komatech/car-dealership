import mongoose, { Document } from 'mongoose';
import { ICar } from '../interfaces/cars.interface';
import CarSchema from '../entities/cars.entity';

export interface CarDocument extends ICar, Document {}

export const CarModel = mongoose.model<CarDocument>('Cars', CarSchema);