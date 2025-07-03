import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBootstrapServiceImplementation } from './infrastructure/adapters/user-bootstrap.service.impl';
import { UsersController } from './presentation/controllers/users.controller';
import { UserInfrastructureMapper } from './infrastructure/mappers/user-infrastructure.mapper';
import { CreateMasterUserHandler } from './application/handlers/commands/create-master-user.handler';
import { CreateUserHandler } from './application/handlers/commands/create-user.handler';
import { UpdateUserHandler } from './application/handlers/commands/update-user.handler';
import { DeleteUserHandler } from './application/handlers/commands/delete-user.handler';
import { UserRepository } from './application/ports/user.repository';
import { TypeormUserRepository } from './infrastructure/adapters/typeorm-user.repository';
import { UserBootstrapService } from './application/ports/user-bootstrap.service';
import { CqrsModule } from '@nestjs/cqrs';
import { GetUserByUsernameHandler } from './application/handlers/queries/get-user-by-username.handler';
import { UserFactory } from './domain/factories/user.factory';
import { UserMapper } from './application/mappers/user.mapper';
import { UserEntity } from './infrastructure/entities/user.typeorm-entity';
import { PasswordService } from './application/ports/password.service';
import { BcryptPasswordService } from './infrastructure/adapters/bcrypt-password.service.impl';

const CommandHandlers = [
  CreateMasterUserHandler,
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
];

const QueryHandlers = [GetUserByUsernameHandler];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CqrsModule],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    {
      provide: UserRepository,
      useClass: TypeormUserRepository,
    },
    {
      provide: UserBootstrapService,
      useClass: UserBootstrapServiceImplementation,
    },
    {
      provide: PasswordService,
      useClass: BcryptPasswordService,
    },
    UserInfrastructureMapper,
    UserFactory,
    UserMapper,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
