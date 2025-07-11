import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetPendingOrdersLast30DaysQuery } from 'src/orders/application/queries/get-pending-orders-last-30-days.query';
import { GetTotalOrdersQuery } from 'src/orders/application/queries/get-total-orders.query';
import { GetTotalSalesQuery } from 'src/orders/application/queries/get-total-sales.query';
import { GetUnpaidOrdersLast30DaysQuery } from 'src/orders/application/queries/get-unpaid-orders-last-30-days.query';
import { OrdersService } from 'src/statistics/application/ports/orders.service';

@Injectable()
export class OrdersServiceImpl implements OrdersService {
  constructor(private readonly queryBus: QueryBus) {}

  async getPendingOrdersLast30Days(): Promise<number> {
    return this.queryBus.execute(new GetPendingOrdersLast30DaysQuery());
  }

  async getTotalsOrders(): Promise<number> {
    return this.queryBus.execute(new GetTotalOrdersQuery());
  }

  async getTotalsSales(): Promise<number> {
    return this.queryBus.execute(new GetTotalSalesQuery());
  }

  async getUnpaidOrdersLast30Days(): Promise<number> {
    return this.queryBus.execute(new GetUnpaidOrdersLast30DaysQuery());
  }
}
