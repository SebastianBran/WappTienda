import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductByIdQuery } from '../../queries/get-product-by-id.query';
import { Product } from 'src/products/domain/entities/product.entity';
import { ProductRepository } from '../../ports/product.repository';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetProductByIdQuery)
export class GetProductByIdHandler
  implements IQueryHandler<GetProductByIdQuery>
{
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(query: GetProductByIdQuery): Promise<Product> {
    const { id } = query;

    const product = await this.productRepository.findActiveById(id);

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }
}
