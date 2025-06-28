import { OrderItem } from '../entities/order-item.entity';
import { Product } from '../entities/product.entity';

export class OrderItemFactory {
  static create(quantity: number, price: number, product: Product): OrderItem {
    return new OrderItem(0, quantity, price, product);
  }
}
