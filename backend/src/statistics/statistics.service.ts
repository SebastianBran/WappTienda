import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Not, Repository } from 'typeorm';
import { Statistic } from './entities/statistic.entity';
import { PaymentStatus } from 'src/orders/entities/payment-status.enum';
import { OrderStatus } from 'src/orders/entities/order-status.enum';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getStatistics(): Promise<Statistic> {
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

    const statistic = Statistic.create(
      totalOrders,
      totalSales,
      pendingOrders,
      unpaidOrders,
    );

    return statistic;
  }
}
