import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ProductType } from '../entities/product-type.enum';

export class CreateProductDto {
  @IsString()
  @IsOptional()
  sku: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(ProductType)
  type: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  salesPrice: number;

  @IsNotEmpty()
  @IsBoolean()
  trackInventory: boolean;

  @IsNumber()
  @Min(0)
  @IsOptional()
  totalInventory: number;

  @IsNotEmpty()
  @IsBoolean()
  visible: boolean;
}
