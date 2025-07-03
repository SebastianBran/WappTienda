import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { UserDto } from 'src/auth/application/dto/user.dto';
import { UserService } from 'src/auth/application/ports/user.service';
import { GetUserByUsernameQuery } from 'src/users/application/queries/get-user-by-username.query';
import { UserInfrastructureMapper } from '../mappers/user-infrastructure.mapper';

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly userMapper: UserInfrastructureMapper,
  ) {}

  async getByUsername(username: string): Promise<UserDto | null> {
    const user = await this.queryBus.execute(
      new GetUserByUsernameQuery(username),
    );

    if (!user) {
      return null;
    }

    return this.userMapper.domainToDto(user);
  }
}
