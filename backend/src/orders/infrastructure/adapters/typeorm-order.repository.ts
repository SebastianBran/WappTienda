import { OrderRepository } from 'src/orders/application/ports/order.repository';
import { Order } from 'src/orders/domain/entities/order.entity';
import { MoreThanOrEqual, Not, Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.typeorm-entity';
import { OrderInfrastructureMapper } from '../mappers/order-infrastructure.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { OrderStatus } from 'src/orders/domain/entities/order-status.enum';
import { PaymentStatus } from 'src/orders/domain/entities/payment-status.enum';

@Injectable()
export class TypeormOrderRepository implements OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly orderInfrastructureMapper: OrderInfrastructureMapper,
  ) {}

  async findAll(limit?: number, offset?: number): Promise<Order[]> {
    const orderEntities = await this.orderRepository.find({
      relations: ['orderItems'],
      take: limit,
      skip: offset,
    });

    return orderEntities.map((order) =>
      this.orderInfrastructureMapper.entityToDomain(order),
    );
  }

  async findById(id: number): Promise<Order | null> {
    const orderEntity = await this.orderRepository.findOne({
      where: { id },
      relations: ['orderItems'],
    });

    if (!orderEntity) {
      return null;
    }

    return this.orderInfrastructureMapper.entityToDomain(orderEntity);
  }

  async findByCustomerId(customerId: number): Promise<Order[]> {
    const orderEntities = await this.orderRepository.find({
      where: { customerId },
      relations: ['orderItems'],
    });

    return orderEntities.map((order) =>
      this.orderInfrastructureMapper.entityToDomain(order),
    );
  }

  async findPaid(): Promise<Order[]> {
    const orderEntities = await this.orderRepository.find({
      where: { paymentStatus: PaymentStatus.PAID },
    });

    return orderEntities.map((order) =>
      this.orderInfrastructureMapper.entityToDomain(order),
    );
  }

  existsById(id: number): Promise<boolean> {
    return this.orderRepository.existsBy({ id });
  }

  async create(order: Order): Promise<Order> {
    const orderEntity = this.orderInfrastructureMapper.domainToEntity(order);
    const createdOrder = this.orderRepository.create(orderEntity);
    const savedOrder = await this.orderRepository.save(createdOrder);
    return this.orderInfrastructureMapper.entityToDomain(savedOrder);
  }

  async update(order: Order): Promise<Order> {
    const orderEntity = this.orderInfrastructureMapper.domainToEntity(order);
    const updatedOrder = await this.orderRepository.save(orderEntity);
    return this.orderInfrastructureMapper.entityToDomain(updatedOrder);
  }

  async remove(id: number): Promise<void> {
    await this.orderRepository.delete({ id });
  }

  countAll(): Promise<number> {
    return this.orderRepository.count();
  }

  countPendingLastNDays(days: number): Promise<number> {
    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - days);

    return this.orderRepository.count({
      where: {
        status: OrderStatus.PENDING,
        created_at: MoreThanOrEqual(dateThreshold),
      },
    });
  }

  async countUnpaidLastNDays(days: number): Promise<number> {
    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - days);

    return this.orderRepository.count({
      where: {
        paymentStatus: Not(PaymentStatus.PAID),
        created_at: MoreThanOrEqual(dateThreshold),
      },
    });
  }
}
