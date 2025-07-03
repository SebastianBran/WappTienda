import { Module } from '@nestjs/common';
import { AuthController } from './presentation/controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UserService } from './application/ports/user.service';
import { UserServiceImpl } from './infrastructure/adapters/user.service.impl';
import { UserInfrastructureMapper } from './infrastructure/mappers/user-infrastructure.mapper';
import { SignInHandler } from './application/handlers/commands/sign-in.handler';
import { CqrsModule } from '@nestjs/cqrs';

const CommandHandlers = [SignInHandler];

@Module({
  controllers: [AuthController],
  providers: [
    ...CommandHandlers,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard,
    },
    {
      provide: UserService,
      useClass: UserServiceImpl,
    },
    UserInfrastructureMapper,
  ],
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: process.env.JWT_EXPIRATION },
        };
      },
    }),
    CqrsModule,
  ],
})
export class AuthModule {}
