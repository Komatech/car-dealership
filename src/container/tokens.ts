export const MODULE_TOKENS = {
  Jwt: Symbol.for("Jwt"),
  Env: Symbol.for("Env"),
  Logger: Symbol.for("Logger"),
  AppDb: Symbol.for("AppDb"),
};

export const SERVICE_TOKENS = {
  UserService: Symbol.for("UserService"),
  CustomerService: Symbol.for("CustomerService"),
  CategoryService: Symbol.for("CategoryService"),
  CarService: Symbol.for("CarService"),
};

export const OPTIONS_TOKENS = {
  JwtOptions: Symbol.for('JwtOptions'),
};

export const MIDDLEWARE_TOKENS = {
  AuthMiddleware: Symbol.for('AuthMiddleware'),
};