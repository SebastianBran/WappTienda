import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './presentation/controllers/orders.controller';
import { OrderEntity } from './infrastructure/entities/order.typeorm-entity';
import { OrderItemEntity } from './infrastructure/entities/order-item.typeorm-entity';
import { CreateOrderHandler } from './application/handlers/commands/create-order.handler';
import { UpdateOrderHandler } from './application/handlers/commands/update-order.handler';
import { DeleteOrderHandler } from './application/handlers/commands/delete-order.handler';
import { GetOrderByIdHandler } from './application/handlers/queries/get-order-by-id.handler';
import { GetOrdersHandler } from './application/handlers/queries/get-orders.handler';
import { TypeormOrderRepository } from './infrastructure/adapters/typeorm-order.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { GetOrdersByCustomerIdHandler } from './application/handlers/queries/get-orders-by-customer-id.handler';
import { GetTotalOrdersHandler } from './application/handlers/queries/get-total-orders.handler';
import { CustomerInfrastructureMapper } from './infrastructure/mappers/customer-infrastructure.mapper';
import { OrderInfrastructureMapper } from './infrastructure/mappers/order-infrastructure.mapper';
import { ProductInfrastructureMapper } from './infrastructure/mappers/product-infrastructure.mapper';
import { OrderItemInfrastructureMapper } from './infrastructure/mappers/order-item-infrastucture.mapper';
import { CustomerService } from './application/ports/customer.service';
import { CustomerServiceImpl } from './infrastructure/adapters/customer.service.impl';
import { OrderRepository } from './application/ports/order.repository';
import { OrderMapper } from './application/mappers/order.mapper';
import { OrderFactory } from './domain/factories/order.factory';
import { ProductService } from './application/ports/product.service';
import { ProductServiceImpl } from './infrastructure/adapters/product.service.impl';
import { OrderItemMapper } from './application/mappers/order-item.mapper';
import { GetPendingOrdersLast30DaysHandler } from './application/handlers/queries/get-pending-orders-last-30-days.handler';
import { GetTotalSalesHandler } from './application/handlers/queries/get-total-sales.handler';
import { GetUnpaidOrdersLast30DaysHandler } from './application/handlers/queries/get-unpaid-orders-last-30-days.query';

const CommandHandlers = [
  CreateOrderHandler,
  UpdateOrderHandler,
  DeleteOrderHandler,
];
const QueryHandlers = [
  GetOrderByIdHandler,
  GetOrdersByCustomerIdHandler,
  GetOrdersHandler,
  GetTotalOrdersHandler,
  GetPendingOrdersLast30DaysHandler,
  GetTotalSalesHandler,
  GetUnpaidOrdersLast30DaysHandler,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderItemEntity]),
    CqrsModule,
  ],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    {
      provide: OrderRepository,
      useClass: TypeormOrderRepository,
    },
    {
      provide: CustomerService,
      useClass: CustomerServiceImpl,
    },
    {
      provide: ProductService,
      useClass: ProductServiceImpl,
    },
    CustomerInfrastructureMapper,
    OrderInfrastructureMapper,
    OrderItemInfrastructureMapper,
    ProductInfrastructureMapper,
    OrderMapper,
    OrderFactory,
    OrderItemMapper,
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
