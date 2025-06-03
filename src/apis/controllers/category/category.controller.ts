import { SuccessResponseDto } from "@app/apis/dto/http-response.dto";
import { MIDDLEWARE_TOKENS, SERVICE_TOKENS } from "@app/container/tokens";
import { CategoryService } from "@app/modules/category/category.service";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut, queryParam, request, requestBody, requestParam, response } from "inversify-express-utils";
import { PaginationDto } from "@app/apis/dto/pagination";
import { validationPipe } from "@app/apis/middlewares/validation.middleware";
import { IdDto } from "@app/apis/dto/id.dto";
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApplicationError } from "@app/helpers/errors";
import { CreateCategoryDto } from "./dtos/create-category.dto";
import { UpdateCategoryDto } from "./dtos/update-category.dto";


@controller("/api/category")
export class CategoryController {

  constructor(
    @inject(SERVICE_TOKENS.CategoryService)
    private readonly categoryService: CategoryService,
  ) {}

  @httpPost("/", MIDDLEWARE_TOKENS.AuthMiddleware,validationPipe(CreateCategoryDto))
    public async createCategory(
      @response() res: Response,
      @requestBody() payload: CreateCategoryDto
    ) {
      try{
          await this.categoryService.create({
              name: payload.name,
              description: payload.description
          });
          return res.status(StatusCodes.CREATED).send(new SuccessResponseDto());
      } catch (error) {
          if ((error as { code: number }).code === 11000) {
              throw new ApplicationError(
                  StatusCodes.CONFLICT,
                  "Category already exists"
              );
          }
          throw new ApplicationError(
              StatusCodes.INTERNAL_SERVER_ERROR,
              "Internal Server Error"
          );
      }
    }

  @httpGet("/", MIDDLEWARE_TOKENS.AuthMiddleware,validationPipe(PaginationDto, "query"))
  public async getCategory(@request() req: Request, @queryParam() paginate: PaginationDto) {
    const category = await this.categoryService.paginate({},{page: paginate.page, limit: paginate.limit});

    return new SuccessResponseDto({ data: category });
  }

  @httpGet("/:id", MIDDLEWARE_TOKENS.AuthMiddleware,validationPipe(IdDto, "params"))
  public async getOneCategory(@request() req: Request, @requestParam() { id }: IdDto) {
    const category = await this.categoryService.findById(id);

    return new SuccessResponseDto({ data: category });
  }

  @httpPut("/:id", MIDDLEWARE_TOKENS.AuthMiddleware,validationPipe(IdDto, "params"), validationPipe(UpdateCategoryDto))
  public async updateCategory(@request() req: Request, @requestParam() { id }: IdDto, @requestBody() payload: UpdateCategoryDto) {
    const category = await this.categoryService.update(id, payload);

    return new SuccessResponseDto({ data: category });
  }

  @httpDelete("/:id", MIDDLEWARE_TOKENS.AuthMiddleware,validationPipe(IdDto, "params"))
  public async deleteOneCategory(@request() req: Request, @requestParam() { id }: IdDto) {
    await this.categoryService.delete(id);

    return new SuccessResponseDto();
  }
}