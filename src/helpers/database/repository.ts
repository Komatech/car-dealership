import {
  Model,
  Document,
  Types,
  FilterQuery,
  UpdateQuery,
  PopulateOptions,
} from 'mongoose';
import { Pagination, PaginationParams, PaginatedResult } from './pagination';

export abstract class BaseRepository<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    try {
      return await this.model.create(data);
    } catch (error) {
      throw error;
    }
  }

  async findById(
  id: string | Types.ObjectId,
  options?: {
    populate?: string | PopulateOptions | PopulateOptions[];
    exclude?: string;
  }
): Promise<T | null> {
  const query = this.model.findById(id);

  if (options?.populate) {
    const populateArg = typeof options.populate === 'string'
      ? [options.populate]
      : options.populate;
    query.populate(populateArg);
  }

  if (options?.exclude) {
    const excludedFields = options.exclude
      .split(' ')
      .map(f => (f.startsWith('-') ? f : `-${f}`))
      .join(' ');
    query.select(excludedFields);
  }

  return await query.exec();
}



  // async findAll(
  //   filter: FilterQuery<T> = {},
  //   options: {
  //     sort?: string;
  //     select?: string;
  //     populate?: string | PopulateOptions;
  //   } = {}
  // ): Promise<T[]> {
  //   const query = this.model.find(filter);

  //   if (options.sort) query.sort(options.sort);
  //   if (options.select) query.select(options.select);
  //   if (options.populate) query.populate(options.populate as Parameters<typeof this.model.populate>[0]);

  //   return await query.exec();
  // }

  async findAll(
    filter: FilterQuery<T> = {},
    options: {
      sort?: string;
      select?: string;
      exclude?: string;
      populate?: string | PopulateOptions;
    } = {}
  ): Promise<T[]> {
    const query = this.model.find(filter);

    if (options.sort) query.sort(options.sort);
    
    if (options.select) query.select(options.select);
    else if (options.exclude) {
      const excludedFields = options.exclude
        .split(' ')
        .map((field) => `-${field}`)
        .join(' ');
      query.select(excludedFields);
    }

    if (options.populate) {
      query.populate(options.populate as Parameters<typeof this.model.populate>[0]);
    }

    return await query.exec();
  }


  async update(
    id: string | Types.ObjectId,
    update: UpdateQuery<T>
  ): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, update, {
      new: true,
    });
  }

  async delete(id: string | Types.ObjectId): Promise<T | null> {
    return await this.model.findByIdAndDelete(id);
  }

  // Soft delete (optional if schema includes `deletedAt`)
  async softDelete(id: string | Types.ObjectId): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, {
      deletedAt: new Date(),
    });
  }

  async paginate(
    filter: FilterQuery<T>,
    params: PaginationParams,
    options: {
      sort?: string;
      select?: string;
      exclude?: string;
      populate?: string | PopulateOptions;
    } = {}
  ): Promise<PaginatedResult<T>> {
    return await Pagination.paginate(filter, this.model, {
      ...params,
      ...options,
    });
  }
}
