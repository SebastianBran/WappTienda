import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Statistics } from './entities/statistics.entity';
import { PaymentStatus } from 'src/orders/domain/entities/payment-status.enum';
import { OrderStatus } from 'src/orders/domain/entities/order-status.enum';
import { OrderEntity } from 'src/orders/infrastructure/entities/order.typeorm-entity';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async getStatistics(): Promise<Statistics> {
    // Total orders
    const totalOrders = await this.orderRepository.count();

    // Total sales
    const paidOrders = await this.orderRepository.find({
      where: {
        paymentStatus: PaymentStatus.PAID,
      },
    });
    const totalSales = paidOrders.reduce((acc, order) => {
      return acc + order.totalAmount;
    }, 0);

    // Pending orders last 30 days
    const pendingOrders = await this.orderRepository.count({
      where: {
        status: OrderStatus.PENDING,
      },
    });

    // Unpaid orders last 30 day
    const unpaidOrders = await this.orderRepository.count({
      where: {
        paymentStatus: Not(PaymentStatus.PAID),
      },
    });

    const statistic = Statistics.create(
      totalOrders,
      totalSales,
      pendingOrders,
      unpaidOrders,
    );

    return statistic;
  }
}
