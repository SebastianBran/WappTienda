import { Command } from '@nestjs/cqrs';
import { Role } from 'src/users/domain/entities/role.enum';

export class UpdateUserCommand extends Command<void> {
  constructor(
    public readonly id: number,
    public readonly role?: Role,
  ) {
    super();
  }
}
