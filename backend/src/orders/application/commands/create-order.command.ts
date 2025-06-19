import { Command } from '@nestjs/cqrs';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { Order } from 'src/orders/domain/entities/order.entity';
import { CreateOrderItemDto } from '../dto/create-order-item.dto';

export class CreateOrderCommand extends Command<Order> {
  constructor(
    public readonly createCustomerDto: CreateCustomerDto,
    public readonly createOrderItemDto: CreateOrderItemDto[],
  ) {
    super();
  }
}
