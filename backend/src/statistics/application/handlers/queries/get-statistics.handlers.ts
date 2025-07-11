import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetStatisticsQuery } from '../../queries/get-statistics.query';
import { OrdersService } from '../../ports/orders.service';
import { Statistics } from 'src/statistics/domain/entities/statistics.entity';

@QueryHandler(GetStatisticsQuery)
export class GetStatisticsHandler implements IQueryHandler<GetStatisticsQuery> {
  constructor(private readonly ordersService: OrdersService) {}

  async execute(): Promise<Statistics> {
    const [totalOrders, totalSales, pendingOrders, unpaidOrders] =
      await Promise.all([
        this.ordersService.getTotalsOrders(),
        this.ordersService.getTotalsSales(),
        this.ordersService.getPendingOrdersLast30Days(),
        this.ordersService.getUnpaidOrdersLast30Days(),
      ]);

    return Statistics.create(
      totalOrders,
      totalSales,
      pendingOrders,
      unpaidOrders,
    );
  }
}
