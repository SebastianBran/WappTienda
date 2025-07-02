import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateMasterUserCommand } from '../../application/commands/create-master-user.command';
import { UserBootstrapService } from 'src/users/application/ports/user-bootstrap.service';

@Injectable()
export class UserBootstrapServiceImplementation
  implements UserBootstrapService
{
  constructor(private readonly commandBus: CommandBus) {}

  async onApplicationBootstrap() {
    await this.commandBus.execute(new CreateMasterUserCommand());
  }
}
