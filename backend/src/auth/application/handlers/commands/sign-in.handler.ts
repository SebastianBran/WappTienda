import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignInCommand } from '../../commands/sign-in.command';
import { SignInResponseDto } from '../../dto/sign-in-response.dto';
import { UserService } from '../../ports/user.service';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@CommandHandler(SignInCommand)
export class SignInHandler implements ICommandHandler<SignInCommand> {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: SignInCommand): Promise<SignInResponseDto> {
    const { username, password: pass } = command;

    const user = await this.userService.getByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordMatching = await bcrypt.compare(pass, user.getPassword());

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.getId(),
      username: user.getUsername(),
      role: user.getRole(),
    };
    const accessToken = await this.jwtService.signAsync(payload);

    return new SignInResponseDto(accessToken);
  }
}
