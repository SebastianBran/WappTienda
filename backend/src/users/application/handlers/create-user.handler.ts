import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command';
import { UserRepository } from '../ports/user.repository';
import { UserFactory } from 'src/users/domain/factories/user.factory';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userFactory: UserFactory,
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const { username, password, role } = command;

    const existingUser = await this.userRepository.findByUsername(username);
    if (existingUser) {
      throw new BadRequestException(
        `User with username ${username} already exists.`,
      );
    }

    const user = this.userFactory.create(username, password, role);

    await this.userRepository.create(user);
  }
}
