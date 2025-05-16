import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { BootstrapUserProvider } from './bootstrap-user.provider';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, BootstrapUserProvider],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
