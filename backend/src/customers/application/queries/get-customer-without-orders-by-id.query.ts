import { Query } from '@nestjs/cqrs';
import { CustomerDto } from '../dto/customer.dto';

export class GetCustomerWithoutOrdersByIdQuery extends Query<CustomerDto> {
  constructor(public readonly id: number) {
    super();
  }
}
