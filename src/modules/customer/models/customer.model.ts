import mongoose, { Document } from 'mongoose';
import { ICustomer } from '../interfaces/customer.interface';
import CustomerSchema from '../entities/customer.entity';

export interface CustomerDocument extends ICustomer, Document {}

export const CustomerModel = mongoose.model<CustomerDocument>('Customers', CustomerSchema);