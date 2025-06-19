import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrderQuery } from '../../queries/get-order.query';
import { Order } from 'src/orders/domain/entities/order.entity';
import { OrderRepository } from '../../ports/order.repository';
import { Inject, NotFoundException } from '@nestjs/common';

@QueryHandler(GetOrderQuery)
export class GetOrderHandler implements IQueryHandler<GetOrderQuery> {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: OrderRepository,
  ) {}

  async execute(query: GetOrderQuery): Promise<Order> {
    const { orderId } = query;

    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    return order;
  }
}
