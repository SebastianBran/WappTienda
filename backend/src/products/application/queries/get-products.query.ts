import { Query } from '@nestjs/cqrs';
import { Product } from 'src/products/domain/entities/product.entity';

export class GetProductsQuery extends Query<Product[]> {
  constructor(
    public readonly offset: number,
    public readonly limit: number,
  ) {
    super();
  }
}
