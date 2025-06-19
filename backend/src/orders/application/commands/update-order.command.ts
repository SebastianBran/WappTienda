import { Command } from '@nestjs/cqrs';
import { OrderStatus } from 'src/orders/domain/entities/order-status.enum';
import { Order } from 'src/orders/domain/entities/order.entity';
import { PaymentStatus } from 'src/orders/domain/entities/payment-status.enum';

export class UpdateOrderCommand extends Command<Order> {
  constructor(
    public readonly orderId: number,
    public readonly internalNotes?: string,
    public readonly status?: OrderStatus,
    public readonly paymentStatus?: PaymentStatus,
  ) {
    super();
  }
}
