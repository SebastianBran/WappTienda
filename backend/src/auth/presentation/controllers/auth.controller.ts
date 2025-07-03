import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from '../dto/sign-in.dto';
import { Public } from '../../../common/decorators/public.decorator';
import { CommandBus } from '@nestjs/cqrs';
import { SignInCommand } from 'src/auth/application/commands/sign-in.command';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Public()
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    const { username, password } = signInDto;
    return this.commandBus.execute(new SignInCommand(username, password));
  }
}
