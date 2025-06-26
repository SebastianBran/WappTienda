import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './presentation/controllers/orders.controller';
import { OrderEntity } from './infrastructure/entities/order.typeorm-entity';
import { OrderItemEntity } from './infrastructure/entities/order-item.typeorm-entity';
import { ProductEntity } from './infrastructure/entities/product.typeorm-entity';
import { CreateOrderHandler } from './application/handlers/commands/create-order.handler';
import { UpdateOrderHandler } from './application/handlers/commands/update-order.handler';
import { DeleteOrderHandler } from './application/handlers/commands/delete-order.handler';
import { GetOrderByIdHandler } from './application/handlers/queries/get-order-by-id.handler';
import { GetOrdersHandler } from './application/handlers/queries/get-orders.handler';
import { TypeormOrderRepository } from './infrastructure/adapters/typeorm-order.repository';
import { TypeormProductRepository } from './infrastructure/adapters/typeorm-product.repository';
import { TypeOrmCustomerRepository } from './infrastructure/adapters/typeorm-customer.repository';
import { CustomerEntity } from './infrastructure/entities/customer.typeorm-entity';
import { CqrsModule } from '@nestjs/cqrs';
import { GetOrdersByCustomerIdHandler } from './application/handlers/queries/get-orders-by-customer-id.handler';

const CommandHandlers = [
  CreateOrderHandler,
  UpdateOrderHandler,
  DeleteOrderHandler,
];
const QueryHandlers = [
  GetOrderByIdHandler,
  GetOrdersByCustomerIdHandler,
  GetOrdersHandler,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      OrderItemEntity,
      ProductEntity,
      CustomerEntity,
    ]),
    CqrsModule,
  ],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    {
      provide: 'OrderRepository',
      useClass: TypeormOrderRepository,
    },
    {
      provide: 'ProductRepository',
      useClass: TypeormProductRepository,
    },
    {
      provide: 'CustomerRepository',
      useClass: TypeOrmCustomerRepository,
    },
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
