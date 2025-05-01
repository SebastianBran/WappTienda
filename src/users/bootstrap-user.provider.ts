import { OnApplicationBootstrap, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from './users.service';

@Injectable()
export class BootstrapUserProvider implements OnApplicationBootstrap {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  private readonly logger = new Logger(BootstrapUserProvider.name);

  async onApplicationBootstrap() {
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

    await this.usersService.create(username, password);
    this.logger.log(`User ${username} created successfully.`);
  }
}
