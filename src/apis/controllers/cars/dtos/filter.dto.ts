import { Type } from 'class-transformer';
import {
  IsOptional,
  IsInt,
  Min,
  IsString,
  IsBoolean,
  IsMongoId,
} from 'class-validator';

export class CarPaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  carModel?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  yearGte?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  yearLte?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  priceGte?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  priceLte?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  mileageGte?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  mileageLte?: number;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  available?: boolean;

  @IsOptional()
  @IsMongoId()
  category?: string;

  @IsOptional()
  @IsString()
  sort?: string;

  @IsOptional()
  @IsString()
  select?: string;

  @IsOptional()
  @IsString()
  exclude?: string;

  @IsOptional()
  @IsString()
  populate?: string;
}
