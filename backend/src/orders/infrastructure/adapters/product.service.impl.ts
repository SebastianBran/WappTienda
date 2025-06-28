import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { OrderItemProductDto } from 'src/orders/application/dto/order-item-product.dto';
import { ProductService } from 'src/orders/application/ports/product.service';
import { GetProductByIdQuery } from 'src/products/application/queries/get-product-by-id.query';
import { ProductInfrastructureMapper } from '../mappers/product-infrastructure.mapper';

@Injectable()
export class ProductServiceImpl implements ProductService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly productInfrastructureMapper: ProductInfrastructureMapper,
  ) {}

  async getById(id: number): Promise<OrderItemProductDto> {
    const product = await this.queryBus.execute(new GetProductByIdQuery(id));
    return this.productInfrastructureMapper.domainToDto(product);
  }
}
