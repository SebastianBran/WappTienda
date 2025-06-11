import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductQuery } from '../../queries/get-product.query';
import { Product } from 'src/products/domain/entities/product.entity';
import { ProductRepository } from '../../ports/product.repository';
import { Inject } from '@nestjs/common';

@QueryHandler(GetProductQuery)
export class GetProductHandler implements IQueryHandler<GetProductQuery> {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  execute(query: GetProductQuery): Promise<Product | null> {
    const { id } = query;
    return this.productRepository.findActiveById(id);
  }
}
