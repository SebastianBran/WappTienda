import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCustomerByPhoneQuery } from '../../queries/get-customer-by-phone.query';
import { Customer } from 'src/customers/domain/entities/customer.entity';
import { CustomerRepository } from '../../ports/customer.repository';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetCustomerByPhoneQuery)
export class GetCustomerByPhoneHandler
  implements IQueryHandler<GetCustomerByPhoneQuery, Customer>
{
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(query: GetCustomerByPhoneQuery): Promise<Customer> {
    const customer = await this.customerRepository.findByPhone(query.phone);

    if (!customer) {
      throw new NotFoundException(
        `Customer with phone ${query.phone} not found`,
      );
    }

    return customer;
  }
}
