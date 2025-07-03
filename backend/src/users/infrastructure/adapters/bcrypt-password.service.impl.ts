import { PasswordService } from 'src/users/application/ports/password.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptPasswordService implements PasswordService {
  constructor(private readonly configService: ConfigService) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = Number(this.configService.get('BCRYPT_SALT_ROUNDS', 10));
    return await bcrypt.hash(password, saltRounds);
  }
}
