import { Product } from 'src/orders/domain/entities/product.entity';

export interface ProductRepository {
  findById(id: number): Promise<Product | null>;
}
