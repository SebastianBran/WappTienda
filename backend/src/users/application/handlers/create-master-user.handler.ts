import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMasterUserCommand } from '../commands/create-master-user.command';
import { UserRepository } from '../ports/user.repository';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { UserFactory } from 'src/users/domain/factories/user.factory';
import { Role } from 'src/users/domain/entities/role.enum';

@CommandHandler(CreateMasterUserCommand)
export class CreateMasterUserHandler
  implements ICommandHandler<CreateMasterUserCommand>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly userFactory: UserFactory,
  ) {}

  private readonly logger = new Logger(CreateMasterUserHandler.name);

  async execute(): Promise<void> {
    const username = this.configService.get<string>('DEFAULT_ADMIN_USER');
    const password = this.configService.get<string>('DEFAULT_ADMIN_PASSWORD');

    if (!username || !password) {
      this.logger.warn(
        'DEFAULT_ADMIN_USER or DEFAULT_ADMIN_PASSWORD not set in config.',
      );
      return;
    }

    const masterUserExists = await this.userRepository.existsMasterUser();

    if (masterUserExists) {
      this.logger.warn('Master user already exists. Skipping creation.');
      return;
    }

    const existingUser = await this.userRepository.findByUsername(username);

    if (existingUser) {
      this.logger.warn(`User ${username} already exists.`);
      return;
    }

    const user = this.userFactory.create(username, password, Role.ADMIN, true);

    await this.userRepository.create(user);

    this.logger.log(`User ${username} created successfully.`);
  }
}
