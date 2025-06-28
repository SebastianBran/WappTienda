import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrderByIdQuery } from '../../queries/get-order-by-id.query';
import { OrderRepository } from '../../ports/order.repository';
import { NotFoundException } from '@nestjs/common';
import { CustomerService } from '../../ports/customer.service';
import { OrderWithCustomerDto } from '../../dto/order-with-customer.dto';
import { OrderMapper } from '../../mappers/order.mapper';

@QueryHandler(GetOrderByIdQuery)
export class GetOrderByIdHandler
  implements IQueryHandler<GetOrderByIdQuery, OrderWithCustomerDto>
{
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly customerService: CustomerService,
    private readonly orderMapper: OrderMapper,
  ) {}

  async execute(query: GetOrderByIdQuery): Promise<OrderWithCustomerDto> {
    const { orderId } = query;

    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    const customer = await this.customerService.getById(order.getCustomerId());

    return this.orderMapper.toOrderWithCustomerDto(order, customer);
  }
}
