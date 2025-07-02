import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/users/domain/entities/role.enum';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetCustomersQuery } from '../../application/queries/get-customers.query';
import { GetCustomerByIdQuery } from '../../application/queries/get-customer-by-id.query';
import { CreateCustomerCommand } from 'src/customers/application/commands/create-customer.commad';
import { UpdateCustomerCommand } from 'src/customers/application/commands/update-customer.commad';
import { DeleteCustomerCommand } from 'src/customers/application/commands/delete-customer.commad';

@Controller('customers')
export class CustomersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Roles(Role.ADMIN, Role.WRITER, Role.READER)
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.queryBus.execute(
      new GetCustomersQuery(paginationQuery.offset, paginationQuery.limit),
    );
  }

  @Roles(Role.ADMIN, Role.WRITER, Role.READER)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.queryBus.execute(new GetCustomerByIdQuery(id));
  }

  @Roles(Role.ADMIN, Role.WRITER)
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.commandBus.execute(
      new CreateCustomerCommand(
        createCustomerDto.name,
        createCustomerDto.phone,
        createCustomerDto.email,
        createCustomerDto.birthDate,
        createCustomerDto.notes,
      ),
    );
  }

  @Roles(Role.ADMIN, Role.WRITER)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.commandBus.execute(
      new UpdateCustomerCommand(
        id,
        updateCustomerDto.name,
        updateCustomerDto.phone,
        updateCustomerDto.email,
        updateCustomerDto.birthDate,
        updateCustomerDto.notes,
      ),
    );
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.commandBus.execute(new DeleteCustomerCommand(id));
  }
}
