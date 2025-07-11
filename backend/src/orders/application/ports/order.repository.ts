import { Order } from 'src/orders/domain/entities/order.entity';

export abstract class OrderRepository {
  abstract findAll(limit?: number, offset?: number): Promise<Order[]>;
  abstract findById(id: number): Promise<Order | null>;
  abstract findByCustomerId(customerId: number): Promise<Order[]>;
  abstract findPaid(): Promise<Order[]>;
  abstract existsById(id: number): Promise<boolean>;
  abstract create(order: Order): Promise<Order>;
  abstract update(order: Order): Promise<Order>;
  abstract remove(id: number): Promise<void>;
  abstract countAll(): Promise<number>;
  abstract countUnpaidLastNDays(days: number): Promise<number>;
  abstract countPendingLastNDays(days: number): Promise<number>;
}
