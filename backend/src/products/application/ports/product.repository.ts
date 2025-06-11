import { Product } from 'src/products/domain/entities/product.entity';

export interface ProductRepository {
  findAll(offset?: number, limit?: number): Promise<Product[]>;
  findAllActive(offset?: number, limit?: number): Promise<Product[]>;
  findById(id: number): Promise<Product | null>;
  findActiveById(id: number): Promise<Product | null>;
  findBySku(sku: string): Promise<Product | null>;
  existBySku(sku: string): Promise<boolean>;
  create(product: Product): Promise<Product>;
  update(product: Product): Promise<Product>;
  remove(id: number): Promise<void>;
}
