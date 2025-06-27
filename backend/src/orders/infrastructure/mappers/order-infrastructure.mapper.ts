import { Order } from 'src/orders/domain/entities/order.entity';
import { OrderEntity } from '../entities/order.typeorm-entity';
import { OrderItemInfrastructureMapper } from './order-item-infrastucture.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderInfrastructureMapper {
  constructor(
    private readonly orderItemInfrastructureMapper: OrderItemInfrastructureMapper,
  ) {}

  public domainToEntity(order: Order) {
    const orderEntity = new OrderEntity();
    orderEntity.id = order.getId();
    orderEntity.orderItems = order
      .getOrderItems()
      .map((orderItem) =>
        this.orderItemInfrastructureMapper.domainToEntity(orderItem),
      );
    orderEntity.totalItems = order.getTotalItems();
    orderEntity.totalAmount = order.getTotalAmount();
    orderEntity.subtotalAmount = order.getSubtotalAmount();
    orderEntity.status = order.getStatus();
    orderEntity.paymentStatus = order.getPaymentStatus();
    orderEntity.internalNotes = order.getInternalNotes() || '';
    orderEntity.created_at = order.getCreatedAt();
    orderEntity.updated_at = order.getUpdatedAt();
    return orderEntity;
  }

  public entityToDomain(orderEntity: OrderEntity): Order {
    const orderItems = orderEntity.orderItems.map((orderItemEntity) =>
      this.orderItemInfrastructureMapper.entityToDomain(orderItemEntity),
    );

    return new Order(
      orderEntity.id,
      orderEntity.status,
      orderEntity.paymentStatus,
      orderEntity.totalAmount,
      orderEntity.subtotalAmount,
      orderEntity.internalNotes,
      orderItems,
      orderEntity.totalItems,
      orderEntity.created_at,
      orderEntity.updated_at,
    );
  }
}
