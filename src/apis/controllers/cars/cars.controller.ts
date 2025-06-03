import { SuccessResponseDto } from "@app/apis/dto/http-response.dto";
import { MIDDLEWARE_TOKENS, SERVICE_TOKENS } from "@app/container/tokens";
import { CarService } from "@app/modules/cars/cars.service";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut, queryParam, request, requestBody, requestParam, response } from "inversify-express-utils";
import { PaginationDto } from "@app/apis/dto/pagination";
import { validationPipe } from "@app/apis/middlewares/validation.middleware";
import { IdDto } from "@app/apis/dto/id.dto";
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApplicationError } from "@app/helpers/errors";
import { CreateCarDto } from "./dtos/create-car.dto";
import { UpdateCarDto } from "./dtos/update-car.dto";
import { CarPaginationDto } from "./dtos/filter.dto";


@controller("/api/cars")
export class CarController {

  constructor(
    @inject(SERVICE_TOKENS.CarService)
    private readonly carService: CarService,
  ) {}

  @httpPost("/", MIDDLEWARE_TOKENS.AuthMiddleware,validationPipe(CreateCarDto))
    public async createCar(
      @response() res: Response,
      @requestBody() payload: CreateCarDto
    ) {
      try{
          await this.carService.create({
                brand: payload.brand,
                carModel: payload.carModel,
                year: payload.year,
                price: payload.price,
                mileage: payload.mileage,
                available: payload.available,
                imageUrl: payload.imageUrls,
                category: payload.category
          });
          return res.status(StatusCodes.CREATED).send(new SuccessResponseDto());
      } catch (error) {
          if ((error as { code: number }).code === 11000) {
              throw new ApplicationError(
                  StatusCodes.CONFLICT,
                  "Car already exists"
              );
          }
          throw new ApplicationError(
              StatusCodes.INTERNAL_SERVER_ERROR,
              "Internal Server Error"
          );
      }
    }

  @httpGet("/", MIDDLEWARE_TOKENS.AuthMiddleware,validationPipe(CarPaginationDto, "query"))
  public async getCar(@request() req: Request, @queryParam() paginate: CarPaginationDto) {
    try {
        const filter = this.carService.dtoToCarFilter(paginate);
        const car = await this.carService.paginate(filter,{page: paginate.page, limit: paginate.limit});

        return new SuccessResponseDto({ data: car });
    } catch (error) {
        throw new ApplicationError(
              StatusCodes.INTERNAL_SERVER_ERROR,
              "Internal Server Error"
        );
    }
  }

  @httpGet("/:id", MIDDLEWARE_TOKENS.AuthMiddleware,validationPipe(IdDto, "params"))
  public async getOneCar(@request() req: Request, @requestParam() { id }: IdDto) {
    try {
        const car = await this.carService.findById(id);

        return new SuccessResponseDto({ data: car });
    } catch (error) {
        throw new ApplicationError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            "Internal Server Error"
        );
    }
  }

  @httpPut("/:id", MIDDLEWARE_TOKENS.AuthMiddleware,validationPipe(IdDto, "params"), validationPipe(UpdateCarDto))
  public async updateCar(@request() req: Request, @requestParam() { id }: IdDto, @requestBody() payload: UpdateCarDto) {
    try {
        const car = await this.carService.update(id, payload);

        return new SuccessResponseDto({ data: car });
    } catch (error) {
        throw new ApplicationError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            "Internal Server Error"
        );
    }
  }

  @httpDelete("/:id", MIDDLEWARE_TOKENS.AuthMiddleware,validationPipe(IdDto, "params"))
  public async deleteOneCar(@request() req: Request, @requestParam() { id }: IdDto) {
    try {
        await this.carService.delete(id);

        return new SuccessResponseDto();
    } catch (error) {
        throw new ApplicationError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            "Internal Server Error"
        );
    }
  }
}