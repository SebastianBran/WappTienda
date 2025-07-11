import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTotalOrdersQuery } from '../../queries/get-total-orders.query';
import { OrderRepository } from '../../ports/order.repository';

@QueryHandler(GetTotalOrdersQuery)
export class GetTotalOrdersHandler
  implements IQueryHandler<GetTotalOrdersQuery>
{
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(): Promise<number> {
    return this.orderRepository.countAll();
  }
}
