import { Product } from 'src/products/domain/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { OrderItemProductDto } from 'src/orders/application/dto/order-item-product.dto';

@Injectable()
export class ProductInfrastructureMapper {
  public domainToDto(product: Product): OrderItemProductDto {
    return new OrderItemProductDto(
      product.getId(),
      product.getSku(),
      product.getName(),
      product.getType(),
      product.getDescription(),
      product.getPrice(),
      product.getSalesPrice(),
      product.isTrackInventory(),
      product.getTotalInventory(),
      product.isVisible(),
      product.isDeleted(),
      product.getCreatedAt(),
      product.getUpdatedAt(),
    );
  }
}
