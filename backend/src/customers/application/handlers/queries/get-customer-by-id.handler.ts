import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCustomerByIdQuery } from '../../queries/get-customer-by-id.query';
import { NotFoundException } from '@nestjs/common';
import { CustomerRepository } from '../../ports/customer.repository';
import { OrderService } from '../../ports/order.service';
import { CustomerWithOrdersDto } from '../../dto/customer-with-orders.dto';
import { CustomerMapper } from '../../mappers/customer.mapper';

@QueryHandler(GetCustomerByIdQuery)
export class GetCustomerByIdHandler
  implements IQueryHandler<GetCustomerByIdQuery, CustomerWithOrdersDto>
{
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly orderService: OrderService,
    private readonly customerMapper: CustomerMapper,
  ) {}

  async execute(query: GetCustomerByIdQuery): Promise<CustomerWithOrdersDto> {
    const { id } = query;

    const customer = await this.customerRepository.findActiveById(id);

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    const orders = await this.orderService.getByCustomerId(id);

    return this.customerMapper.toCustomerWithOrdersDto(customer, orders);
  }
}
