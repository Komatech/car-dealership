import mongoose, { Document } from 'mongoose';
import { ICategory } from '../interfaces/category.interface';
import CategorySchema from '../entities/category.entity';

export interface CategoryDocument extends ICategory, Document {}

export const CategoryModel = mongoose.model<CategoryDocument>('Category', CategorySchema);