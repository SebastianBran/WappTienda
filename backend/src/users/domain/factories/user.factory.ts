import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.enum';

@Injectable()
export class UserFactory {
  public create(
    username: string,
    password: string,
    role: Role,
    isMaster: boolean = false,
  ): User {
    return new User(0, username, password, role, isMaster);
  }
}
