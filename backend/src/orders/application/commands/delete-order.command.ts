import { Command } from '@nestjs/cqrs';

export class DeleteOrderCommand extends Command<void> {
  constructor(public readonly orderId: number) {
    super();
  }
}
