import { Query } from '@nestjs/cqrs';
import { Order } from 'src/orders/domain/entities/order.entity';

export class GetOrdersQuery extends Query<Order[]> {
  constructor(
    public readonly offset: number,
    public readonly limit: number,
  ) {
    super();
  }
}
