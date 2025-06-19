import { Module } from '@nestjs/common';
import { CustomersController } from './presentation/controllers/customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { GetCustomersHandler } from './application/handlers/queries/get-customers.handler';
import { GetCustomerHandler } from './application/handlers/queries/get-customer.handler';
import { TypeOrmCustomerRepository } from './infrastructure/adapters/typeorm-customer.repository';
import { CustomerEntity } from './infrastructure/entities/customer.typeorm-entity';
import { OrderEntity } from './infrastructure/entities/order.typeorm-entity';
import { CreateCustomerHandler } from './application/handlers/commands/create-customer.handler';
import { UpdateCustomerHandler } from './application/handlers/commands/update-customer.handler';
import { DeleteCustomerHandler } from './application/handlers/commands/delete-customer.handler';

const CommandHandlers = [
  CreateCustomerHandler,
  UpdateCustomerHandler,
  DeleteCustomerHandler,
];
const QueryHandlers = [GetCustomersHandler, GetCustomerHandler];

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerEntity, OrderEntity]),
    CqrsModule,
  ],
  controllers: [CustomersController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    { provide: 'CustomerRepository', useClass: TypeOrmCustomerRepository },
  ],
})
export class CustomersModule {}
