import { OnApplicationBootstrap, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from './users.service';
import { Role } from './entities/role.enum';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class BootstrapUserProvider implements OnApplicationBootstrap {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  private readonly logger = new Logger(BootstrapUserProvider.name);

  async onApplicationBootstrap() {
    const masterUserExists = await this.usersService.existsMasterUser();

    if (masterUserExists) {
      this.logger.warn('Master user already exists. Skipping creation.');
      return;
    }

    const username = this.configService.get<string>('DEFAULT_ADMIN_USER');
    const password = this.configService.get<string>('DEFAULT_ADMIN_PASSWORD');

    if (!username || !password) {
      this.logger.warn(
        'DEFAULT_ADMIN_USER or DEFAULT_ADMIN_PASSWORD not set in config.',
      );
      return;
    }

    const existingUser = await this.usersService.findOne(username);

    if (existingUser) {
      this.logger.warn(`User ${username} already exists.`);
      return;
    }

    const createUserDto: CreateUserDto = {
      username,
      password,
      role: Role.ADMIN,
    };

    await this.usersService.create(createUserDto, true);
    this.logger.log(`User ${username} created successfully.`);
  }
}
