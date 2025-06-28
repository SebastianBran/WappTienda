import { Command } from '@nestjs/cqrs';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { CreateOrderItemDto } from '../dto/create-order-item.dto';
import { OrderWithCustomerDto } from '../dto/order-with-customer.dto';

export class CreateOrderCommand extends Command<OrderWithCustomerDto> {
  constructor(
    public readonly createCustomerDto: CreateCustomerDto,
    public readonly createOrderItemDto: CreateOrderItemDto[],
  ) {
    super();
  }
}
