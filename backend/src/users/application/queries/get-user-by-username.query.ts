import { Query } from '@nestjs/cqrs';
import { User } from 'src/users/domain/entities/user.entity';

export class GetUserByUsernameQuery extends Query<User | null> {
  constructor(public username: string) {
    super();
  }
}
