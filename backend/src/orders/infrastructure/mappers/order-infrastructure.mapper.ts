import { Order } from 'src/orders/domain/entities/order.entity';
import { OrderEntity } from '../entities/order.typeorm-entity';
import { CustomerInfrastructureMapper } from './customer-infrastructure.mapper';
import { OrderItemInfrastructureMapper } from './order-item-infrastucture.mapper';

export class OrderInfrastructureMapper {
  static domainToEntity(order: Order) {
    const orderEntity = new OrderEntity();
    orderEntity.id = order.getId();
    orderEntity.customer = CustomerInfrastructureMapper.domainToEntity(
      order.getCustomer(),
    );
    orderEntity.orderItems = order
      .getOrderItems()
      .map((orderItem) =>
        OrderItemInfrastructureMapper.domainToEntity(orderItem),
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

  static entityToDomain(orderEntity: OrderEntity): Order {
    const orderItems = orderEntity.orderItems.map((orderItemEntity) =>
      OrderItemInfrastructureMapper.entityToDomain(orderItemEntity),
    );

    const customer = CustomerInfrastructureMapper.entityToDomain(
      orderEntity.customer,
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
      customer,
      orderEntity.created_at,
      orderEntity.updated_at,
    );
  }

  private;
}
