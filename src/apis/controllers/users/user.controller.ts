import { SuccessResponseDto } from "@app/apis/dto/http-response.dto";
import { MIDDLEWARE_TOKENS, SERVICE_TOKENS } from "@app/container/tokens";
import { UserService } from "@app/modules/users/users.service";
import { inject } from "inversify";
import { controller, httpGet, queryParam, request, requestParam } from "inversify-express-utils";
import { PaginationDto } from "@app/apis/dto/pagination";
import { validationPipe } from "@app/apis/middlewares/validation.middleware";
import { IdDto } from "@app/apis/dto/id.dto";


@controller("/api/user")
export class UserController {

  constructor(
    @inject(SERVICE_TOKENS.UserService)
    private readonly userService: UserService,
  ) {}

  @httpGet("/", MIDDLEWARE_TOKENS.AuthMiddleware,validationPipe(PaginationDto, "query"))
  public async getUser(@request() req: Request, @queryParam() paginate: PaginationDto) {
    const user = await this.userService.paginate({},{page: paginate.page, limit: paginate.limit},{exclude: "password"});

    return new SuccessResponseDto({ data: user });
  }

  @httpGet("/:id", MIDDLEWARE_TOKENS.AuthMiddleware,validationPipe(IdDto, "params"))
  public async getOneUser(@request() req: Request, @requestParam() { id }: IdDto) {
    const user = await this.userService.findById(id, {exclude: "password"});

    return new SuccessResponseDto({ data: user });
  }
}