import { User } from 'src/users/domain/entities/user.entity';

export abstract class UserRepository {
  abstract findById(id: number): Promise<User | null>;
  abstract findByUsername(username: string): Promise<User | null>;
  abstract existsMasterUser(): Promise<boolean>;
  abstract create(user: User): Promise<void>;
  abstract update(user: User): Promise<void>;
  abstract remove(id: number): Promise<void>;
}
