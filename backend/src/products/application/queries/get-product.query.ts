import { Query } from '@nestjs/cqrs';
import { Product } from 'src/products/domain/entities/product.entity';

export class GetProductQuery extends Query<Product> {
  constructor(public readonly id: number) {
    super();
  }
}
