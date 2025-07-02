import { Injectable } from '@nestjs/common';
import { UpdateUserCommand } from '../commands/update-user.command';
import { User } from 'src/users/domain/entities/user.entity';

@Injectable()
export class UserMapper {
  public updateUserCommandToDomain(
    updateUserCommand: UpdateUserCommand,
    user: User,
  ): User {
    if (updateUserCommand.role !== undefined) {
      user.setRole(updateUserCommand.role);
    }

    return user;
  }
}
