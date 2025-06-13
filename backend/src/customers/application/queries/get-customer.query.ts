import { Query } from '@nestjs/cqrs';
import { Customer } from 'src/customers/domain/entities/customer.entity';

export class GetCustomerQuery extends Query<Customer> {
  constructor(public readonly id: number) {
    super();
  }
}
