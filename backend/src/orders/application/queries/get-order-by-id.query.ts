import { Query } from '@nestjs/cqrs';
import { Order } from 'src/orders/domain/entities/order.entity';

export class GetOrderByIdQuery extends Query<Order> {
  constructor(public readonly orderId: number) {
    super();
  }
}
