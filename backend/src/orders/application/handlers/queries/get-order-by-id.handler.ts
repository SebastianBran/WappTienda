import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrderByIdQuery } from '../../queries/get-order-by-id.query';
import { Order } from 'src/orders/domain/entities/order.entity';
import { OrderRepository } from '../../ports/order.repository';
import { Inject, NotFoundException } from '@nestjs/common';

@QueryHandler(GetOrderByIdQuery)
export class GetOrderByIdHandler implements IQueryHandler<GetOrderByIdQuery> {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: OrderRepository,
  ) {}

  async execute(query: GetOrderByIdQuery): Promise<Order> {
    const { orderId } = query;

    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    return order;
  }
}
