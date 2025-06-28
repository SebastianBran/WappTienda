import { OrderItem } from 'src/orders/domain/entities/order-item.entity';
import { OrderItemEntity } from '../entities/order-item.typeorm-entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderItemInfrastructureMapper {
  public entityToDomain(orderItemEntity: OrderItemEntity): OrderItem {
    return new OrderItem(
      orderItemEntity.id,
      orderItemEntity.quantity,
      orderItemEntity.price,
      orderItemEntity.productId,
    );
  }

  public domainToEntity(orderItem: OrderItem): OrderItemEntity {
    const orderItemEntity = new OrderItemEntity();
    orderItemEntity.id = orderItem.getId();
    orderItemEntity.quantity = orderItem.getQuantity();
    orderItemEntity.price = orderItem.getPrice();
    orderItemEntity.productId = orderItem.getProductId();
    return orderItemEntity;
  }
}
