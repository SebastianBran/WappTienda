import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { Role } from '../../domain/entities/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from 'src/users/application/commands/create-user.command';
import { UpdateUserCommand } from 'src/users/application/commands/update-user.command';
import { DeleteUserCommand } from 'src/users/application/commands/delete-user.command';

@Roles(Role.ADMIN)
@Controller('users')
export class UsersController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const { username, password, role } = createUserDto;
    return this.commandBus.execute(
      new CreateUserCommand(username, password, role),
    );
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    const { role } = updateUserDto;
    return this.commandBus.execute(new UpdateUserCommand(id, role));
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.commandBus.execute(new DeleteUserCommand(id));
  }
}
