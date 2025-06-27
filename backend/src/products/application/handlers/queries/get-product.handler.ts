import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductQuery } from '../../queries/get-product.query';
import { Product } from 'src/products/domain/entities/product.entity';
import { ProductRepository } from '../../ports/product.repository';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetProductQuery)
export class GetProductHandler implements IQueryHandler<GetProductQuery> {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(query: GetProductQuery): Promise<Product> {
    const { id } = query;

    const product = await this.productRepository.findActiveById(id);

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }
}
