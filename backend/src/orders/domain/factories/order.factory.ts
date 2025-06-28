import { Order } from '../entities/order.entity';
import { OrderStatus } from '../entities/order-status.enum';
import { PaymentStatus } from '../entities/payment-status.enum';
import { OrderItem } from '../entities/order-item.entity';

export class OrderFactory {
  public create(customerId: number, orderItems: OrderItem[]) {
    const totalItems = orderItems.reduce((total, item) => {
      return total + item.getQuantity();
    }, 0);

    const totalAmount = orderItems.reduce((total, item) => {
      return total + item.getPrice() * item.getQuantity();
    }, 0);

    return new Order(
      0,
      OrderStatus.PENDING,
      PaymentStatus.PENDING,
      totalAmount,
      totalAmount,
      null,
      orderItems,
      totalItems,
      customerId,
    );
  }
}
