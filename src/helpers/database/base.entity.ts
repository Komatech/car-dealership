// utils/SchemaFactory.ts

import { Schema, SchemaOptions, SchemaTypes } from 'mongoose';

export class SchemaFactory {
  static readonly defaultOptions: SchemaOptions = {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    versionKey: false,
    toObject: {
      virtuals: true,
      getters: true,
    },
    toJSON: {
      virtuals: true,
      getters: true,
    },
  };

  static readonly baseFields = {
    deletedAt: { type: SchemaTypes.Date },
  };

  static create(
    fields: Record<string, any>,
    options: Partial<SchemaOptions> = {}
  ): Schema {
    if (Object.keys(fields).length === 0) {
      throw new Error("Cannot create schema from empty schema definition");
    }

    return new Schema(
      {
        ...fields,
        ...this.baseFields,
      },
      {
        ...this.defaultOptions,
        ...options,
      }
    );
  }
}
