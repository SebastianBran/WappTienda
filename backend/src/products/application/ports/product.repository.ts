import { Product } from 'src/products/domain/entities/product.entity';

export abstract class ProductRepository {
  abstract findAllActive(offset?: number, limit?: number): Promise<Product[]>;
  abstract findById(id: number): Promise<Product | null>;
  abstract findActiveById(id: number): Promise<Product | null>;
  abstract existBySku(sku: string): Promise<boolean>;
  abstract create(product: Product): Promise<Product>;
  abstract update(product: Product): Promise<Product>;
}
