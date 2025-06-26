import { Order } from 'src/orders/domain/entities/order.entity';

export interface OrderRepository {
  findAll(limit?: number, offset?: number): Promise<Order[]>;
  findById(id: number): Promise<Order | null>;
  findByCustomerId(customerId: number): Promise<Order[]>;
  existsById(id: number): Promise<boolean>;
  create(order: Order): Promise<Order>;
  update(order: Order): Promise<Order>;
  remove(id: number): Promise<void>;
}
