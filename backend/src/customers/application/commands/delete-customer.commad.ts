import { Command } from '@nestjs/cqrs';

export class DeleteCustomerCommand extends Command<void> {
  constructor(public readonly id: number) {
    super();
  }
}
