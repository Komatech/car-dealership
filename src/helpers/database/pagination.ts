import { FilterQuery, Model, PopulateOptions } from 'mongoose';

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  select?: string | Record<string, 0 | 1>;
  populate?: string | PopulateOptions | (string | PopulateOptions)[];
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export class Pagination {
  static getPaginationOptions({ page = 1, limit = 10 }: PaginationParams) {
    const sanitizedPage = Math.max(1, Number(page));
    const sanitizedLimit = Math.max(1, Math.min(Number(limit), 100)); // cap at 100

    return {
      skip: (sanitizedPage - 1) * sanitizedLimit,
      limit: sanitizedLimit,
      page: sanitizedPage,
    };
  }

  // static async paginate<T extends {}>(
  //   query: FilterQuery<T>,
  //   model: Model<T>,
  //   params: PaginationParams = {}
  // ): Promise<PaginatedResult<T>> {
  //   const { skip, limit, page } = this.getPaginationOptions(params);
  //   const { sort, select, populate } = params;

  //   let mongoQuery = model.find(query).skip(skip).limit(limit);

  //   if (sort) mongoQuery = mongoQuery.sort(sort);
  //   if (select) mongoQuery = mongoQuery.select(select);
  //   if (populate) mongoQuery = mongoQuery.populate(populate as Parameters<typeof model.populate>[0]);

  //   const [data, total] = await Promise.all([
  //     mongoQuery.exec(),
  //     model.countDocuments(query),
  //   ]);

  //   const totalPages = Math.ceil(total / limit);

  //   return {
  //     data,
  //     total,
  //     page,
  //     limit,
  //     totalPages,
  //     hasNextPage: page < totalPages,
  //     hasPrevPage: page > 1,
  //   };
  // }
  static async paginate<T extends {}>(
    query: FilterQuery<T>,
    model: Model<T>,
    params: PaginationParams = {}
  ): Promise<PaginatedResult<T>> {
    const { skip, limit, page } = this.getPaginationOptions(params);
    const { sort, select, populate, exclude } = params as PaginationParams & { exclude?: string };

    let mongoQuery = model.find(query).skip(skip).limit(limit);

    if (sort) mongoQuery = mongoQuery.sort(sort);
    
    if (select) {
      mongoQuery = mongoQuery.select(select);
    } else if (exclude) {
      const excludedFields = exclude
        .split(' ')
        .map((field) => `-${field}`)
        .join(' ');
      mongoQuery = mongoQuery.select(excludedFields);
    }

    if (populate) {
      mongoQuery = mongoQuery.populate(populate as Parameters<typeof model.populate>[0]);
    }

    const [data, total] = await Promise.all([
      mongoQuery.exec(),
      model.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
  }

}
