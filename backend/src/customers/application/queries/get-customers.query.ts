import { Query } from '@nestjs/cqrs';
import { Customer } from 'src/customers/domain/entities/customer.entity';

export class GetCustomersQuery extends Query<Customer[]> {
  constructor(
    public readonly offset: number,
    public readonly limit: number,
  ) {
    super();
  }
}
