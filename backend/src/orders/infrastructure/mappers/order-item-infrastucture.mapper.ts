import { OrderItem } from 'src/orders/domain/entities/order-item.entity';
import { OrderItemEntity } from '../entities/order-item.typeorm-entity';
import { ProductInfrastructureMapper } from './product-infrastructure.mapper';

export class OrderItemInfrastructureMapper {
  static entityToDomain(orderItemEntity: OrderItemEntity): OrderItem {
    const product = ProductInfrastructureMapper.entityToDomain(
      orderItemEntity.product,
    );

    return new OrderItem(
      orderItemEntity.id,
      orderItemEntity.quantity,
      orderItemEntity.price,
      product,
    );
  }

  static domainToEntity(orderItem: OrderItem): OrderItemEntity {
    const orderItemEntity = new OrderItemEntity();
    orderItemEntity.id = orderItem.getId();
    orderItemEntity.quantity = orderItem.getQuantity();
    orderItemEntity.price = orderItem.getPrice();
    orderItemEntity.product = ProductInfrastructureMapper.domainToEntity(
      orderItem.getProduct(),
    );
    return orderItemEntity;
  }
}
