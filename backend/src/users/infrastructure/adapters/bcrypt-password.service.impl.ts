import { PasswordService } from 'src/users/application/ports/password.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

export class BcryptPasswordService implements PasswordService {
  constructor(private readonly configService: ConfigService) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = this.configService.get<number>('BCRYPT_SALT_ROUNDS', 10);
    return await bcrypt.hash(password, saltRounds);
  }
}
