import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrderByIdQuery } from '../../queries/get-order-by-id.query';
import { OrderRepository } from '../../ports/order.repository';
import { NotFoundException } from '@nestjs/common';
import { CustomerService } from '../../ports/customer.service';
import { OrderWithCustomerDto } from '../../dto/order-with-customer.dto';
import { OrderMapper } from '../../mappers/order.mapper';
import { ProductService } from '../../ports/product.service';
import { OrderItemMapper } from '../../mappers/order-item.mapper';
import { OrderItemWithProductDto } from '../../dto/order-item-with-product.dto';
import { OrderItem } from 'src/orders/domain/entities/order-item.entity';

@QueryHandler(GetOrderByIdQuery)
export class GetOrderByIdHandler
  implements IQueryHandler<GetOrderByIdQuery, OrderWithCustomerDto>
{
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly customerService: CustomerService,
    private readonly orderMapper: OrderMapper,
    private readonly productService: ProductService,
    private readonly orderItemMapper: OrderItemMapper,
  ) {}

  async execute(query: GetOrderByIdQuery): Promise<OrderWithCustomerDto> {
    const { orderId } = query;

    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    const customer = await this.customerService.getById(order.getCustomerId());

    const orderItemsWithProducts = await this.getOrderItemsWithProducts(
      order.getOrderItems(),
    );

    return this.orderMapper.toOrderWithCustomerDto(
      order,
      customer,
      orderItemsWithProducts,
    );
  }

  async getOrderItemsWithProducts(
    orderItems: OrderItem[],
  ): Promise<OrderItemWithProductDto[]> {
    return Promise.all(
      orderItems.map(async (item) => {
        const product = await this.productService.getById(item.getProductId());
        return this.orderItemMapper.toOrderItemWithProductDto(item, product);
      }),
    );
  }
}
