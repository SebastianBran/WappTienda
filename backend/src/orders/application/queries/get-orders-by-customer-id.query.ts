import { Query } from '@nestjs/cqrs';
import { Order } from 'src/orders/domain/entities/order.entity';

export class GetOrdersByCustomerIdQuery extends Query<Order[]> {
  constructor(public readonly customerId: number) {
    super();
  }
}
