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
  @IsNotEmpty()
  @IsString()
  readonly sku: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEnum(ProductType)
  readonly type: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly salesPrice: number;

  @IsNotEmpty()
  @IsBoolean()
  readonly trackInventory: boolean;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly totalInventory: number;

  @IsNotEmpty()
  @IsBoolean()
  readonly visible: boolean;
}
