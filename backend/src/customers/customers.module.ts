import { Module } from '@nestjs/common';
import { CustomersController } from './presentation/controllers/customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { GetCustomersHandler } from './application/handlers/queries/get-customers.handler';
import { GetCustomerByIdHandler } from './application/handlers/queries/get-customer-by-id.handler';
import { TypeOrmCustomerRepository } from './infrastructure/adapters/typeorm-customer.repository';
import { CustomerEntity } from './infrastructure/entities/customer.typeorm-entity';
import { CreateCustomerHandler } from './application/handlers/commands/create-customer.handler';
import { UpdateCustomerHandler } from './application/handlers/commands/update-customer.handler';
import { DeleteCustomerHandler } from './application/handlers/commands/delete-customer.handler';
import { OrderServiceImpl } from './infrastructure/adapters/order.service.impl';
import { CustomerRepository } from './application/ports/customer.repository';
import { OrderService } from './application/ports/order.service';
import { CustomerMapper } from './application/mappers/customer.mapper';
import { CustomerInfrastructureMapper } from './infrastructure/mappers/customer-infrastructure.mapper';
import { OrderInfrastructureMapper } from './infrastructure/mappers/order-infraestructure.mapper';
import { CustomerFactory } from './domain/factories/customer.factory';

const CommandHandlers = [
  CreateCustomerHandler,
  UpdateCustomerHandler,
  DeleteCustomerHandler,
];
const QueryHandlers = [GetCustomersHandler, GetCustomerByIdHandler];

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity]), CqrsModule],
  controllers: [CustomersController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    {
      provide: CustomerRepository,
      useClass: TypeOrmCustomerRepository,
    },
    {
      provide: OrderService,
      useClass: OrderServiceImpl,
    },
    CustomerMapper,
    CustomerInfrastructureMapper,
    OrderInfrastructureMapper,
    CustomerFactory,
  ],
})
export class CustomersModule {}
