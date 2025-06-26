import { Command } from '@nestjs/cqrs';
import { Order } from 'src/orders/domain/entities/order.entity';

export class GetOrderByIdQuery extends Command<Order> {
  constructor(public readonly orderId: number) {
    super();
  }
}
