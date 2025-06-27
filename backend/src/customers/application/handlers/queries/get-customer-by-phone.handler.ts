import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCustomerByPhoneQuery } from '../../queries/get-customer-by-phone.query';
import { Customer } from 'src/customers/domain/entities/customer.entity';
import { CustomerRepository } from '../../ports/customer.repository';

@QueryHandler(GetCustomerByPhoneQuery)
export class GetCustomerByPhoneHandler
  implements IQueryHandler<GetCustomerByPhoneQuery, Customer | null>
{
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(query: GetCustomerByPhoneQuery): Promise<Customer | null> {
    return await this.customerRepository.findByPhone(query.phone);
  }
}
