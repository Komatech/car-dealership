import {
  IsNotEmpty,
  IsString,
  IsEmail,
} from "class-validator";
import { Match } from "@app/apis/decorators/matches.decorator";


export class SignupDto {
  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  lastName!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsNotEmpty()
  @Match("password", { message: "password must match" })
  confirmPassword!: string;
}