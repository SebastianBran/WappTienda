import { OrderItem } from 'src/orders/domain/entities/order-item.entity';
import { OrderItemEntity } from '../entities/order-item.typeorm-entity';
import { ProductInfrastructureMapper } from './product-infrastructure.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderItemInfrastructureMapper {
  constructor(
    private readonly productInfrastructureMapper: ProductInfrastructureMapper,
  ) {}

  public entityToDomain(orderItemEntity: OrderItemEntity): OrderItem {
    const product = this.productInfrastructureMapper.entityToDomain(
      orderItemEntity.product,
    );

    return new OrderItem(
      orderItemEntity.id,
      orderItemEntity.quantity,
      orderItemEntity.price,
      product,
    );
  }

  public domainToEntity(orderItem: OrderItem): OrderItemEntity {
    const orderItemEntity = new OrderItemEntity();
    orderItemEntity.id = orderItem.getId();
    orderItemEntity.quantity = orderItem.getQuantity();
    orderItemEntity.price = orderItem.getPrice();
    orderItemEntity.product = this.productInfrastructureMapper.domainToEntity(
      orderItem.getProduct(),
    );
    return orderItemEntity;
  }
}
