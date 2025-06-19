import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrdersQuery } from '../../queries/get-orders.query';
import { Order } from 'src/orders/domain/entities/order.entity';
import { Inject } from '@nestjs/common';
import { OrderRepository } from '../../ports/order.repository';

@QueryHandler(GetOrdersQuery)
export class GetOrdersHandler implements IQueryHandler<GetOrdersQuery> {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: OrderRepository,
  ) {}

  async execute(query: GetOrdersQuery): Promise<Order[]> {
    const { limit, offset } = query;
    return this.orderRepository.findAll(limit, offset);
  }
}
