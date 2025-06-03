import { BaseRepository } from "@app/helpers/database/repository";
import { CarDocument, CarModel } from "./models/cars.model";
import { injectable } from "inversify";
import { CarPaginationDto } from "@app/apis/controllers/cars/dtos/filter.dto";
import { FilterQuery } from "mongoose";

@injectable()
export class CarService extends BaseRepository<CarDocument> {
  constructor() {
    super(CarModel);
  }

  public dtoToCarFilter(dto: CarPaginationDto): FilterQuery<CarDocument> {
    const filter: FilterQuery<CarDocument> = {};

    if (dto.brand) filter.brand = dto.brand;
    if (dto.carModel) filter.carModel = dto.carModel;
    if (dto.available !== undefined) filter.available = dto.available;
    if (dto.category) filter.category = dto.category;

    if (dto.yearGte || dto.yearLte) {
      filter.year = {};
      if (dto.yearGte !== undefined) filter.year.$gte = dto.yearGte;
      if (dto.yearLte !== undefined) filter.year.$lte = dto.yearLte;
    }

    if (dto.priceGte || dto.priceLte) {
      filter.price = {};
      if (dto.priceGte !== undefined) filter.price.$gte = dto.priceGte;
      if (dto.priceLte !== undefined) filter.price.$lte = dto.priceLte;
    }

    if (dto.mileageGte || dto.mileageLte) {
      filter.mileage = {};
      if (dto.mileageGte !== undefined) filter.mileage.$gte = dto.mileageGte;
      if (dto.mileageLte !== undefined) filter.mileage.$lte = dto.mileageLte;
    }

    return filter;
  }
}