"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureAppContainer = configureAppContainer;
const env_1 = require("@app/config/env");
const logger_1 = require("@app/helpers/logger");
const serializers_1 = require("@app/helpers/logger/serializers");
const inversify_1 = require("inversify");
const tokens_1 = require("@app/container/tokens");
const database_config_1 = require("@app/config/database.config");
const users_service_1 = require("@app/modules/users/users.service");
const cars_service_1 = require("@app/modules/cars/cars.service");
const category_service_1 = require("@app/modules/category/category.service");
const customer_service_1 = require("@app/modules/customer/customer.service");
const jwt_1 = require("@app/helpers/jwt");
const auth_middleware_1 = require("@app/apis/middlewares/auth.middleware");
async function configureAppContainer() {
    const container = new inversify_1.Container();
    container.bind(tokens_1.MODULE_TOKENS.Env).to(env_1.Env);
    const env = container.get(tokens_1.MODULE_TOKENS.Env);
    env.load();
    const logger = new logger_1.Logger({
        name: env.get('SERVICE_NAME'),
        serializers: (0, serializers_1.defaultSerializers)(),
    });
    container.bind(tokens_1.MODULE_TOKENS.Logger).toConstantValue(logger);
    const db = await (0, database_config_1.connectToDb)(env, logger);
    container.bind(tokens_1.MODULE_TOKENS.AppDb).toConstantValue(db);
    container.bind(tokens_1.MODULE_TOKENS.Jwt).to(jwt_1.Jwt).inSingletonScope();
    container.bind(tokens_1.OPTIONS_TOKENS.JwtOptions).toConstantValue({
        secret: process.env.AUTH_JWT_SECRET,
        signOptions: { algorithm: 'HS256' },
        verifyOptions: { algorithms: ['HS256'] }
    });
    container.bind(tokens_1.SERVICE_TOKENS.UserService).to(users_service_1.UserService);
    container.bind(tokens_1.SERVICE_TOKENS.CarService).to(cars_service_1.CarService);
    container.bind(tokens_1.SERVICE_TOKENS.CategoryService).to(category_service_1.CategoryService);
    container.bind(tokens_1.SERVICE_TOKENS.CustomerService).to(customer_service_1.CustomerService);
    container
        .bind(tokens_1.MIDDLEWARE_TOKENS.AuthMiddleware)
        .to(auth_middleware_1.AuthMiddleware);
    return container;
}
//# sourceMappingURL=container.js.map