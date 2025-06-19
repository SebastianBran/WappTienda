import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateOrderCommand } from '../../commands/update-order.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { OrderRepository } from '../../ports/order.repository';
import { OrderMapper } from '../../mappers/order.mapper';
import { Order } from 'src/orders/domain/entities/order.entity';

@CommandHandler(UpdateOrderCommand)
export class UpdateOrderHandler implements ICommandHandler<UpdateOrderCommand> {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: OrderRepository,
  ) {}

  async execute(command: UpdateOrderCommand): Promise<Order> {
    const order = await this.orderRepository.findById(command.orderId);

    if (!order) {
      throw new NotFoundException(`Order with ID ${command.orderId} not found`);
    }

    const updatedOrder = OrderMapper.updateOrderCommandToDomain(command, order);

    return await this.orderRepository.create(updatedOrder);
  }
}
