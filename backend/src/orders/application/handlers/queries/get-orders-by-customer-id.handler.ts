import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrdersByCustomerIdQuery } from '../../queries/get-orders-by-customer-id.query';
import { Order } from 'src/orders/domain/entities/order.entity';
import { OrderRepository } from '../../ports/order.repository';

@QueryHandler(GetOrdersByCustomerIdQuery)
export class GetOrdersByCustomerIdHandler
  implements IQueryHandler<GetOrdersByCustomerIdQuery>
{
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(query: GetOrdersByCustomerIdQuery): Promise<Order[]> {
    const { customerId } = query;

    return await this.orderRepository.findByCustomerId(customerId);
  }
}
