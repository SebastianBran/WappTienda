import { Query } from '@nestjs/cqrs';
import { OrderWithCustomerDto } from '../dto/order-with-customer.dto';

export class GetOrderByIdQuery extends Query<OrderWithCustomerDto> {
  constructor(public readonly orderId: number) {
    super();
  }
}
