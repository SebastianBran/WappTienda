import { Query } from '@nestjs/cqrs';
import { Customer } from 'src/customers/domain/entities/customer.entity';

export class GetCustomerByPhoneQuery extends Query<Customer | null> {
  constructor(public readonly phone: string) {
    super();
  }
}
