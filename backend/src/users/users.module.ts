import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/entities/user.entity';
import { UserBootstrapServiceImplementation } from './infrastructure/adapters/user-bootstrap.service.impl';
import { UsersController } from './presentation/controllers/users.controller';
import { UserInfrastructureMapper } from './infrastructure/mappers/user-infrastructure.mapper';
import { CreateMasterUserHandler } from './application/handlers/create-master-user.handler';
import { CreateUserHandler } from './application/handlers/create-user.handler';
import { UpdateUserHandler } from './application/handlers/update-user.handler';
import { DeleteUserHandler } from './application/handlers/delete-user.handler';
import { UserRepository } from './application/ports/user.repository';
import { TypeormUserRepository } from './infrastructure/adapters/typeorm-user.repository';
import { UserBootstrapService } from './application/ports/user-bootstrap.service';

const CommandHandlers = [
  CreateMasterUserHandler,
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
];

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    ...CommandHandlers,
    {
      provide: UserRepository,
      useClass: TypeormUserRepository,
    },
    {
      provide: UserBootstrapService,
      useClass: UserBootstrapServiceImplementation,
    },
    UserInfrastructureMapper,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
