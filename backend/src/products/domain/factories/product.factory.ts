import { Injectable } from '@nestjs/common';
import { ProductType } from '../entities/product-type.enum';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductFactory {
  public create(
    sku: string | null,
    name: string,
    type: ProductType,
    description: string | null,
    price: number,
    salesPrice: number,
    trackInventory: boolean,
    totalInventory: number,
    visible: boolean,
  ): Product {
    return new Product(
      0,
      sku,
      name,
      type,
      description,
      price,
      salesPrice,
      trackInventory,
      totalInventory,
      visible,
    );
  }
}
