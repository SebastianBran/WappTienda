import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByUsernameQuery } from '../../queries/get-user-by-username.query';
import { UserRepository } from '../../ports/user.repository';
import { User } from 'src/users/domain/entities/user.entity';

@QueryHandler(GetUserByUsernameQuery)
export class GetUserByUsernameHandler
  implements IQueryHandler<GetUserByUsernameQuery>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUserByUsernameQuery): Promise<User | null> {
    const { username } = query;

    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      return null;
    }

    return user;
  }
}
