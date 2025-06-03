import { Env } from '@app/config/env';
import { Logger } from '@app/helpers/logger';
import { defaultSerializers } from '@app/helpers/logger/serializers';
import { Container } from 'inversify';
import { MIDDLEWARE_TOKENS, MODULE_TOKENS, OPTIONS_TOKENS, SERVICE_TOKENS } from '@app/container/tokens';
import { connectToDb } from '@app/config/database.config';
import { UserService } from '@app/modules/users/users.service';
import { CarService } from '@app/modules/cars/cars.service';
import { CategoryService } from '@app/modules/category/category.service';
import { CustomerService } from '@app/modules/customer/customer.service';
import { Jwt, JwtOptions } from '@app/helpers/jwt';
import { AuthMiddleware } from '@app/apis/middlewares/auth.middleware';



export async function configureAppContainer(): Promise<Container> {
  const container = new Container();

  container.bind<Env>(MODULE_TOKENS.Env).to(Env);

  const env = container.get<Env>(MODULE_TOKENS.Env);

  env.load();

  const logger = new Logger({
    name: env.get<string>('SERVICE_NAME'),
    serializers: defaultSerializers(),
  });


  container.bind<Logger>(MODULE_TOKENS.Logger).toConstantValue(logger);

  const db = await connectToDb(env, logger);

  container.bind<void>(MODULE_TOKENS.AppDb).toConstantValue(db);

  container.bind<Jwt>(MODULE_TOKENS.Jwt).to(Jwt).inSingletonScope();

  container.bind<JwtOptions>(OPTIONS_TOKENS.JwtOptions).toConstantValue({
    secret: process.env.AUTH_JWT_SECRET,
    signOptions: { algorithm: 'HS256' },
    verifyOptions: { algorithms: ['HS256'] }
  });

  container.bind<UserService>(SERVICE_TOKENS.UserService).to(UserService);

  container.bind<CarService>(SERVICE_TOKENS.CarService).to(CarService);

  container.bind<CategoryService>(SERVICE_TOKENS.CategoryService).to(CategoryService);

  container.bind<CustomerService>(SERVICE_TOKENS.CustomerService).to(CustomerService);

  container
    .bind<AuthMiddleware>(MIDDLEWARE_TOKENS.AuthMiddleware)
    .to(AuthMiddleware);

  return container;
}