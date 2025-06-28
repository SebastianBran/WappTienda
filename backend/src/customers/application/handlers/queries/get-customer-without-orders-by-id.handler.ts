import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCustomerWithoutOrdersByIdQuery } from '../../queries/get-customer-without-orders-by-id.query';
import { CustomerDto } from '../../dto/customer.dto';
import { CustomerRepository } from '../../ports/customer.repository';
import { CustomerMapper } from '../../mappers/customer.mapper';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetCustomerWithoutOrdersByIdQuery)
export class GetCustomerWithoutOrdersByIdHandler
  implements IQueryHandler<GetCustomerWithoutOrdersByIdQuery>
{
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly customerMapper: CustomerMapper,
  ) {}

  async execute(
    query: GetCustomerWithoutOrdersByIdQuery,
  ): Promise<CustomerDto> {
    const { id } = query;
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }

    return this.customerMapper.toCustomerDto(customer);
  }
}
