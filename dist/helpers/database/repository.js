"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const pagination_1 = require("./pagination");
class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        try {
            return await this.model.create(data);
        }
        catch (error) {
            throw error;
        }
    }
    async findById(id, options) {
        const query = this.model.findById(id);
        if (options === null || options === void 0 ? void 0 : options.populate) {
            const populateArg = typeof options.populate === 'string'
                ? [options.populate]
                : options.populate;
            query.populate(populateArg);
        }
        if (options === null || options === void 0 ? void 0 : options.exclude) {
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
    async findAll(filter = {}, options = {}) {
        const query = this.model.find(filter);
        if (options.sort)
            query.sort(options.sort);
        if (options.select)
            query.select(options.select);
        else if (options.exclude) {
            const excludedFields = options.exclude
                .split(' ')
                .map((field) => `-${field}`)
                .join(' ');
            query.select(excludedFields);
        }
        if (options.populate) {
            query.populate(options.populate);
        }
        return await query.exec();
    }
    async update(id, update) {
        return await this.model.findByIdAndUpdate(id, update, {
            new: true,
        });
    }
    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }
    // Soft delete (optional if schema includes `deletedAt`)
    async softDelete(id) {
        return await this.model.findByIdAndUpdate(id, {
            deletedAt: new Date(),
        });
    }
    async paginate(filter, params, options = {}) {
        return await pagination_1.Pagination.paginate(filter, this.model, Object.assign(Object.assign({}, params), options));
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=repository.js.map