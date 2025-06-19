import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from 'src/orders/infrastructure/entities/order.typeorm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  providers: [StatisticsService],
  controllers: [StatisticsController],
})
export class StatisticsModule {}
