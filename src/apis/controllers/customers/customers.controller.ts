import { SuccessResponseDto } from "@app/apis/dto/http-response.dto";
import { MIDDLEWARE_TOKENS, SERVICE_TOKENS } from "@app/container/tokens";
import { CustomerService } from "@app/modules/customer/customer.service";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut, queryParam, request, requestBody, requestParam, response } from "inversify-express-utils";
import { PaginationDto } from "@app/apis/dto/pagination";
import { validationPipe } from "@app/apis/middlewares/validation.middleware";
import { IdDto } from "@app/apis/dto/id.dto";
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApplicationError } from "@app/helpers/errors";
import { CreateCustomerDto } from "./dtos/create-customer.dto";
import { UpdateCustomerDto } from "./dtos/update-customer.dto";


@controller("/api/customers")
export class CustomerController {

  constructor(
    @inject(SERVICE_TOKENS.CustomerService)
    private readonly customerService: CustomerService,
  ) {}

  @httpPost("/", MIDDLEWARE_TOKENS.AuthMiddleware,validationPipe(CreateCustomerDto))
    public async createCustomer(
      @response() res: Response,
      @requestBody() payload: CreateCustomerDto
    ) {
      try{
          await this.customerService.create({...payload});
          return res.status(StatusCodes.CREATED).send(new SuccessResponseDto());
      } catch (error) {
          if ((error as { code: number }).code === 11000) {
              throw new ApplicationError(
                  StatusCodes.CONFLICT,
                  "Customer already exists"
              );
          }
          throw new ApplicationError(
              StatusCodes.INTERNAL_SERVER_ERROR,
              "Internal Server Error"
          );
      }
    }

  @httpGet("/", MIDDLEWARE_TOKENS.AuthMiddleware,validationPipe(PaginationDto, "query"))
  public async getCustomer(@request() req: Request, @queryParam() paginate: PaginationDto) {
    const customer = await this.customerService.paginate({},{page: paginate.page, limit: paginate.limit});

    return new SuccessResponseDto({ data: customer });
  }

  @httpGet("/:id", MIDDLEWARE_TOKENS.AuthMiddleware,validationPipe(IdDto, "params"))
  public async getOneCustomer(@request() req: Request, @requestParam() { id }: IdDto) {
    const customer = await this.customerService.findById(id);

    return new SuccessResponseDto({ data: customer });
  }

  @httpPut("/:id", MIDDLEWARE_TOKENS.AuthMiddleware,validationPipe(IdDto, "params"), validationPipe(UpdateCustomerDto))
  public async updateCustomer(@request() req: Request, @requestParam() { id }: IdDto, @requestBody() payload: UpdateCustomerDto) {
    const customer = await this.customerService.update(id, payload);

    return new SuccessResponseDto({ data: customer });
  }

  @httpDelete("/:id", MIDDLEWARE_TOKENS.AuthMiddleware,validationPipe(IdDto, "params"))
  public async deleteOneCustomer(@request() req: Request, @requestParam() { id }: IdDto) {
    await this.customerService.delete(id);

    return new SuccessResponseDto();
  }
}