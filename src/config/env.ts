import * as process from "process";
import { configDotenv } from "dotenv";
import { injectable } from "inversify";
import { AppEnv } from "@app/helpers/enums";
import { DtoValidationError, validateDto } from "@app/utils/validator-utils";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class EnvDto {
  @IsString()
  @IsEnum(AppEnv)
  @IsOptional()
  NODE_ENV = AppEnv.DEVELOPMENT;

  @IsString()
  @IsNotEmpty()
  AUTH_JWT_SECRET!: string;

  @IsString()
  @IsOptional()
  PORT = 8000;

  @IsString()
  MONGO_URI = 'localhost:27071';
}

export class IncompleteEnvError extends Error {
  constructor(error: DtoValidationError) {
    super(
      `Unable to load environment:\n${JSON.stringify(error.messages, null, 2)}`,
    );
  }
}

@injectable()
export class Env {
  private validatedEnv: Record<string, any> = {};

  public load() {
    try {
      configDotenv();
      this.validatedEnv = validateDto(process.env, EnvDto);
    } catch (err) {
      if (err instanceof DtoValidationError) {
        throw new IncompleteEnvError(err);
      }
      throw err;
    }
  }

  public get<T = string>(key: string) {
    if (this.validatedEnv?.[key] != null) return this.validatedEnv[key] as T;

    return process.env[key] as T;
  }
}
