import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateOrderCommand } from '../../commands/update-order.command';
import { NotFoundException } from '@nestjs/common';
import { OrderRepository } from '../../ports/order.repository';
import { OrderMapper } from '../../mappers/order.mapper';
import { Order } from 'src/orders/domain/entities/order.entity';

@CommandHandler(UpdateOrderCommand)
export class UpdateOrderHandler implements ICommandHandler<UpdateOrderCommand> {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderMapper: OrderMapper,
  ) {}

  async execute(command: UpdateOrderCommand): Promise<Order> {
    const order = await this.orderRepository.findById(command.orderId);

    if (!order) {
      throw new NotFoundException(`Order with ID ${command.orderId} not found`);
    }

    const updatedOrder = this.orderMapper.updateOrderCommandToDomain(
      command,
      order,
    );

    return await this.orderRepository.update(updatedOrder);
  }
}
