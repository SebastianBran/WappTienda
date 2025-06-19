import { Order } from 'src/orders/domain/entities/order.entity';
import { UpdateOrderCommand } from '../commands/update-order.command';

export class OrderMapper {
  static updateOrderCommandToDomain(command: UpdateOrderCommand, order: Order) {
    if (command.internalNotes !== undefined) {
      order.setInternalNotes(command.internalNotes);
    }

    if (command.status !== undefined) {
      order.setStatus(command.status);
    }

    if (command.paymentStatus !== undefined) {
      order.setPaymentStatus(command.paymentStatus);
    }

    return order;
  }
}
