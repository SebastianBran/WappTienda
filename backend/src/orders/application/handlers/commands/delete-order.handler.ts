import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteOrderCommand } from '../../commands/delete-order.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { OrderRepository } from '../../ports/order.repository';

@CommandHandler(DeleteOrderCommand)
export class DeleteOrderHandler implements ICommandHandler<DeleteOrderCommand> {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: OrderRepository,
  ) {}

  async execute(command: DeleteOrderCommand): Promise<void> {
    const orderExists = await this.orderRepository.existsById(command.orderId);

    if (!orderExists) {
      throw new NotFoundException(`Order with ID ${command.orderId} not found`);
    }

    await this.orderRepository.remove(command.orderId);
  }
}
