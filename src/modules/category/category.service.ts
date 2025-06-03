import { BaseRepository } from "@app/helpers/database/repository";
import { CategoryDocument, CategoryModel } from "./models/category.model";
import { injectable } from "inversify";

@injectable()
export class CategoryService extends BaseRepository<CategoryDocument> {
  constructor() {
    super(CategoryModel);
  }
}