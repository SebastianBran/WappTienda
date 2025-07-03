import { UserDto } from '../dto/user.dto';

export abstract class UserService {
  abstract getByUsername(username: string): Promise<UserDto | null>;
}
