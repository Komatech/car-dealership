import { CreateCarDto } from './create-car.dto';
import { IsOptional } from 'class-validator';

export class UpdateCarDto {
  @IsOptional()
  brand?: CreateCarDto['brand'];

  @IsOptional()
  carModel?: CreateCarDto['carModel'];

  @IsOptional()
  year?: CreateCarDto['year'];

  @IsOptional()
  price?: CreateCarDto['price'];

  @IsOptional()
  mileage?: CreateCarDto['mileage'];

  @IsOptional()
  available?: CreateCarDto['available'];

  @IsOptional()
  category?: CreateCarDto['category'];

  @IsOptional()
  imageUrls?: CreateCarDto['imageUrls'];
}
