import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductsQuery } from '../../queries/get-products.query';
import { Product } from 'src/products/domain/entities/product.entity';
import { ProductRepository } from '../../ports/product.repository';

@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler<GetProductsQuery> {
  constructor(private readonly productRepository: ProductRepository) {}

  execute(query: GetProductsQuery): Promise<Product[]> {
    const { offset, limit } = query;
    return this.productRepository.findAllActive(offset, limit);
  }
}
