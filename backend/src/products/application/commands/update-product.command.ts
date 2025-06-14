import { Command } from '@nestjs/cqrs';
import { ProductType } from 'src/products/domain/entities/product-type.enum';
import { Product } from 'src/products/domain/entities/product.entity';

export class UpdateProductCommand extends Command<Product> {
  constructor(
    public id: number,
    public sku?: string,
    public name?: string,
    public type?: ProductType,
    public description?: string,
    public price?: number,
    public salesPrice?: number,
    public trackInventory?: boolean,
    public totalInventory?: number,
    public visible?: boolean,
  ) {
    super();
  }
}
