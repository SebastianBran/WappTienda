import { Command } from '@nestjs/cqrs';
import { SignInResponseDto } from '../dto/sign-in-response.dto';

export class SignInCommand extends Command<SignInResponseDto> {
  constructor(
    public username: string,
    public password: string,
  ) {
    super();
  }
}
