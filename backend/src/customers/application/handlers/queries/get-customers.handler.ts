import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCustomersQuery } from '../../queries/get-customers.query';
import { CustomerRepository } from '../../ports/customer.repository';
import { Customer } from 'src/customers/domain/entities/customer.entity';

@QueryHandler(GetCustomersQuery)
export class GetCustomersHandler implements IQueryHandler<GetCustomersQuery> {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(query: GetCustomersQuery): Promise<Customer[]> {
    const { limit, offset } = query;
    return await this.customerRepository.findAllActive(offset, limit);
  }
}
