import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTotalSalesQuery } from '../../queries/get-total-sales.query';
import { OrderRepository } from '../../ports/order.repository';

@QueryHandler(GetTotalSalesQuery)
export class GetTotalSalesHandler implements IQueryHandler<GetTotalSalesQuery> {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(): Promise<number> {
    const orders = await this.orderRepository.findPaid();

    const totalSales = orders.reduce((total, order) => {
      return total + order.getTotalAmount();
    }, 0);

    return totalSales;
  }
}
