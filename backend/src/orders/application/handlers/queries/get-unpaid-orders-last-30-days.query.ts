import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUnpaidOrdersLast30DaysQuery } from '../../queries/get-unpaid-orders-last-30-days.query';
import { OrderRepository } from '../../ports/order.repository';

@QueryHandler(GetUnpaidOrdersLast30DaysQuery)
export class GetUnpaidOrdersLast30DaysHandler
  implements IQueryHandler<GetUnpaidOrdersLast30DaysQuery>
{
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(): Promise<number> {
    return this.orderRepository.countUnpaidLastNDays(30);
  }
}
