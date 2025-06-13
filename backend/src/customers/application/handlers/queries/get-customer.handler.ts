import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCustomerQuery } from '../../queries/get-customer.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { CustomerRepository } from '../../ports/customer.repository';

@QueryHandler(GetCustomerQuery)
export class GetCustomerHandler implements IQueryHandler<GetCustomerQuery> {
  constructor(
    @Inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository,
  ) {}

  async execute(query: GetCustomerQuery): Promise<any> {
    const { id } = query;

    const customer = await this.customerRepository.findActiveById(id);

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return customer;
  }
}
