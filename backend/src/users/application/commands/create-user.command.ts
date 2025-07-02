import { Command } from '@nestjs/cqrs';
import { Role } from 'src/users/domain/entities/role.enum';

export class CreateUserCommand extends Command<void> {
  constructor(
    public readonly username: string,
    public readonly password: string,
    public readonly role: Role,
  ) {
    super();
  }
}
