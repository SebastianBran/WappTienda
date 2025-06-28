import { Injectable } from '@nestjs/common';
import { OrderItem } from 'src/orders/domain/entities/order-item.entity';
import { OrderItemProductDto } from '../dto/order-item-product.dto';
import { OrderItemWithProductDto } from '../dto/order-item-with-product.dto';

@Injectable()
export class OrderItemMapper {
  toOrderItemWithProductDto(
    item: OrderItem,
    product: OrderItemProductDto,
  ): OrderItemWithProductDto {
    return new OrderItemWithProductDto(
      item.getId(),
      item.getQuantity(),
      item.getPrice(),
      product,
      item.getCreatedAt(),
      item.getUpdatedAt(),
    );
  }
}
