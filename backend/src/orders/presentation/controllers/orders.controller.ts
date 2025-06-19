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
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/users/entities/role.enum';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetOrdersQuery } from 'src/orders/application/queries/get-orders.query';
import { GetOrderQuery } from 'src/orders/application/queries/get-order.query';
import { CreateOrderCommand } from 'src/orders/application/commands/create-order.command';
import { UpdateOrderCommand } from 'src/orders/application/commands/update-order.command';
import { DeleteOrderCommand } from 'src/orders/application/commands/delete-order.command';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Roles(Role.ADMIN, Role.WRITER, Role.READER)
  @Get()
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.queryBus.execute(
      new GetOrdersQuery(paginationQueryDto.offset, paginationQueryDto.limit),
    );
  }

  @Roles(Role.ADMIN, Role.WRITER, Role.READER)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.queryBus.execute(new GetOrderQuery(id));
  }

  @Roles(Role.ADMIN, Role.WRITER)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.commandBus.execute(
      new CreateOrderCommand(
        createOrderDto.customer,
        createOrderDto.orderItems,
      ),
    );
  }

  @Public()
  @Post('/public')
  createPublic(@Body() createOrderDto: CreateOrderDto) {
    return this.commandBus.execute(
      new CreateOrderCommand(
        createOrderDto.customer,
        createOrderDto.orderItems,
      ),
    );
  }

  @Roles(Role.ADMIN, Role.WRITER)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto) {
    return this.commandBus.execute(
      new UpdateOrderCommand(
        id,
        updateOrderDto.internalNotes,
        updateOrderDto.status,
        updateOrderDto.paymentStatus,
      ),
    );
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.commandBus.execute(new DeleteOrderCommand(id));
  }
}
