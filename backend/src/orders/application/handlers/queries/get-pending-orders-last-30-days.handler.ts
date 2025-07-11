import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPendingOrdersLast30DaysQuery } from '../../queries/get-pending-orders-last-30-days.query';
import { OrderRepository } from '../../ports/order.repository';

@QueryHandler(GetPendingOrdersLast30DaysQuery)
export class GetPendingOrdersLast30DaysHandler
  implements IQueryHandler<GetPendingOrdersLast30DaysQuery>
{
  private readonly LAST_N_DAYS = 30;

  constructor(private readonly orderRepository: OrderRepository) {}

  execute(): Promise<number> {
    return this.orderRepository.countPendingLastNDays(this.LAST_N_DAYS);
  }
}
