import { Command } from '@nestjs/cqrs';

export class CreateMasterUserCommand extends Command<void> {
  constructor() {
    super();
  }
}
