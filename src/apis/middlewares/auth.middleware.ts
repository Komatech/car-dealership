import { inject, injectable } from 'inversify';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import { ApplicationError } from '@app/helpers/errors';
import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { Jwt } from '@app/helpers/jwt';
import { BaseMiddleware } from 'inversify-express-utils';
import { MODULE_TOKENS } from '@app/container/tokens';

@injectable()
export class AuthMiddleware extends BaseMiddleware {
  @inject(MODULE_TOKENS.Jwt) private readonly jwt!: Jwt;

  public async handler(req: Request, _res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers['authorization'];
      if (!authHeader || typeof authHeader !== 'string') {
        throw new ApplicationError(StatusCodes.UNAUTHORIZED, 'UNAUTHORIZED');
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
        throw new ApplicationError(StatusCodes.UNAUTHORIZED, 'UNAUTHORIZED');
      }

      const decoded = await this.jwt.verifyAsync(token, {});
      (req as any).claim = decoded;

      next();
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        next(new ApplicationError(StatusCodes.UNAUTHORIZED, 'TOKEN_EXPIRED'));
      } else if (err instanceof JsonWebTokenError) {
        next(new ApplicationError(StatusCodes.UNAUTHORIZED, 'INVALID_TOKEN'));
      } else {
        next(err);
      }
    }
  }
}
