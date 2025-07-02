import { UserRepository } from '../ports/user.repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../commands/update-user.command';
import { NotFoundException } from '@nestjs/common';
import { UserMapper } from '../mappers/user.mapper';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(command: UpdateUserCommand): Promise<void> {
    const { id } = command;

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const updatedUser = this.userMapper.updateUserCommandToDomain(
      command,
      user,
    );

    await this.userRepository.update(updatedUser);
  }
}
