import { OrderItem } from '../entities/order-item.entity';

export class OrderItemFactory {
  static create(quantity: number, price: number, productId: number): OrderItem {
    return new OrderItem(0, quantity, price, productId);
  }
}
