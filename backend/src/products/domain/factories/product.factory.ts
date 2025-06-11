import { ProductType } from '../entities/product-type.enum';
import { Product } from '../entities/product.entity';

export class ProductFactory {
  public static create(
    id: number,
    name: string,
    type: ProductType,
    price: number,
    salesPrice: number,
    trackInventory: boolean,
    totalInventory: number,
    visible: boolean,
    deleted: boolean,
    sku?: string,
    description?: string,
  ): Product {
    return new Product(
      id,
      sku || null,
      name,
      type,
      description || null,
      price,
      salesPrice,
      trackInventory,
      totalInventory,
      visible,
      deleted,
      undefined,
      undefined,
    );
  }
}
