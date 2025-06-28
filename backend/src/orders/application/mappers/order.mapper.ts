import { Order } from 'src/orders/domain/entities/order.entity';
import { UpdateOrderCommand } from '../commands/update-order.command';
import { CustomerOrderDto } from '../dto/customer-order.dto';
import { OrderWithCustomerDto } from '../dto/order-with-customer.dto';

export class OrderMapper {
  public updateOrderCommandToDomain(command: UpdateOrderCommand, order: Order) {
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

  public toOrderWithCustomerDto(
    order: Order,
    customerDto: CustomerOrderDto,
  ): OrderWithCustomerDto {
    return new OrderWithCustomerDto(
      order.getId(),
      order.getStatus(),
      order.getPaymentStatus(),
      order.getTotalAmount(),
      order.getSubtotalAmount(),
      order.getInternalNotes(),
      order.getOrderItems(),
      order.getTotalItems(),
      customerDto,
      order.getCreatedAt(),
      order.getUpdatedAt(),
    );
  }
}
