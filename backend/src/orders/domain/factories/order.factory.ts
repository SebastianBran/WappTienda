import { Order } from '../entities/order.entity';
import { OrderStatus } from '../entities/order-status.enum';
import { PaymentStatus } from '../entities/payment-status.enum';
import { OrderItem } from '../entities/order-item.entity';

export class OrderFactory {
  public static create(
    status: OrderStatus,
    paymentStatus: PaymentStatus,
    internalNotes: string | null,
    orderItems: OrderItem[],
  ) {
    const totalItems = orderItems.reduce((total, item) => {
      return total + item.getQuantity();
    }, 0);

    const totalAmount = orderItems.reduce((total, item) => {
      return total + item.getPrice() * item.getQuantity();
    }, 0);

    return new Order(
      0,
      status,
      paymentStatus,
      totalAmount,
      // Assuming subtotalAmount is the same as totalAmount for simplicity
      // In the future, you might want to calculate it differently
      // based on discounts or other factors
      totalAmount,
      internalNotes,
      orderItems,
      totalItems,
    );
  }
}
