import { Module } from '@nestjs/common';
import { StatisticsController } from './presentation/controllers/statistics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from 'src/orders/infrastructure/entities/order.typeorm-entity';
import { CqrsModule } from '@nestjs/cqrs';
import { OrdersService } from './application/ports/orders.service';
import { OrdersServiceImpl } from './infrastructure/adapters/orders.service.impl';
import { GetStatisticsHandler } from './application/handlers/queries/get-statistics.handlers';

const QueryHandlers = [GetStatisticsHandler];

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity]), CqrsModule],
  providers: [
    ...QueryHandlers,
    {
      provide: OrdersService,
      useClass: OrdersServiceImpl,
    },
  ],
  controllers: [StatisticsController],
})
export class StatisticsModule {}
