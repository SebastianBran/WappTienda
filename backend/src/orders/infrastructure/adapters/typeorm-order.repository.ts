import { OrderRepository } from 'src/orders/application/ports/order.repository';
import { Order } from 'src/orders/domain/entities/order.entity';
import { Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.typeorm-entity';
import { OrderInfrastructureMapper } from '../mappers/order-infrastructure.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeormOrderRepository implements OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly orderInfrastructureMapper: OrderInfrastructureMapper,
  ) {}

  async findAll(limit?: number, offset?: number): Promise<Order[]> {
    const orderEntities = await this.orderRepository.find({
      relations: ['orderItems', 'orderItems.product', 'customer'],
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
      relations: ['orderItems', 'orderItems.product', 'customer'],
    });

    if (!orderEntity) {
      return null;
    }

    return this.orderInfrastructureMapper.entityToDomain(orderEntity);
  }

  async findByCustomerId(customerId: number): Promise<Order[]> {
    const orderEntities = await this.orderRepository.find({
      where: { customer: { id: customerId } },
      relations: ['orderItems', 'orderItems.product', 'customer'],
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
}
