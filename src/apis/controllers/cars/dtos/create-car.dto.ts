import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsArray,
  IsMongoId,
} from 'class-validator';

export class CreateCarDto {
  @IsString()
  brand!: string;

  @IsString()
  carModel!: string;

  @IsNumber()
  year!: number;

  @IsNumber()
  price!: number;

  @IsOptional()
  @IsNumber()
  mileage?: number;

  @IsOptional()
  @IsBoolean()
  available?: boolean;

  @IsOptional()
  @IsMongoId()
  category?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imageUrls?: [string];
}
