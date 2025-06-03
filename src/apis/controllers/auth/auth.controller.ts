import {
  controller,
  httpPost,
  requestBody,
  response,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import {
  MODULE_TOKENS,
  SERVICE_TOKENS,
} from '@app/container/tokens';
import { UserService } from '@app/modules/users/users.service';
import { validationPipe } from '@app/apis/middlewares/validation.middleware';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { SuccessResponseDto } from '@app/apis/dto/http-response.dto';
import { ApplicationError } from '@app/helpers/errors';
import { Jwt } from '@app/helpers/jwt';
import { hashPassword, verifyPassword } from '@app/utils/bcrypt-utils';
import { LoginDto } from '@app/apis/controllers/auth/dtos/login.dto';
import { SignupDto } from './dtos/signup.dto';

@controller("/api/auth")
export class AuthController {
  constructor(
    @inject(MODULE_TOKENS.Jwt) private readonly jwt: Jwt,
    @inject(SERVICE_TOKENS.UserService)
    private readonly userService: UserService,
  ) {}

  @httpPost("/signup", validationPipe(SignupDto))
  public async Signup(
    @response() res: Response,
    @requestBody() payload: SignupDto
  ) {
    try{
        await this.userService.create({
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            password: await hashPassword(payload.password)
        });
        return res.status(StatusCodes.CREATED).send(new SuccessResponseDto());
    } catch (error) {
        if ((error as { code: number }).code === 11000) {
            throw new ApplicationError(
                StatusCodes.CONFLICT,
                "Email taken already"
            );
        }
        throw new ApplicationError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            "Internal Server Error"
        );
    }
  }

  @httpPost("/login", validationPipe(LoginDto))
  public async login(
    @response() res: Response,
    @requestBody() payload: LoginDto
  ) {
    const user = await this.userService.getByEmail(payload.email);

    if (user == null) {
      throw new ApplicationError(
        StatusCodes.BAD_REQUEST,
        "Invalid email address or password"
      );
    }

    const isPassword = await verifyPassword(
      payload.password,
      user.password
    );

    if (!isPassword) {
      throw new ApplicationError(StatusCodes.BAD_REQUEST, "Invalid email address or password");
    }

    const auth_token = await this.jwt.signAsync(
        { id: user.id, tokenType: "access" },
        { expiresIn: "30min" }
    );

    return new SuccessResponseDto({ data: { auth_token } });
  }
}
