import { OrderDto } from 'src/customers/application/dto/order.dto';

export abstract class OrderService {
  abstract getByCustomerId(customerId: number): Promise<OrderDto[]>;
}
