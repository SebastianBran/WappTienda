import { Command } from '@nestjs/cqrs';
import { ProductType } from 'src/products/domain/entities/product-type.enum';
import { Product } from 'src/products/domain/entities/product.entity';

export class CreateProductCommand extends Command<Product> {
  constructor(
    public name: string,
    public type: ProductType,
    public price: number,
    public salesPrice: number,
    public trackInventory: boolean,
    public totalInventory: number,
    public visible: boolean,
    public sku?: string,
    public description?: string,
  ) {
    super();
  }
}
