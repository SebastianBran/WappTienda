import { Query } from '@nestjs/cqrs';
import { CustomerWithOrdersDto } from '../dto/customer-with-orders.dto';

export class GetCustomerByIdQuery extends Query<CustomerWithOrdersDto> {
  constructor(public readonly id: number) {
    super();
  }
}
