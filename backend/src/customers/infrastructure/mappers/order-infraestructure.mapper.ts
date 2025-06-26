import { Injectable } from '@nestjs/common';
import { OrderDto } from 'src/customers/application/dto/order.dto';
import { Order } from 'src/orders/domain/entities/order.entity';

@Injectable()
export class OrderInfrastructureMapper {
  public domainToDto(order: Order): OrderDto {
    return new OrderDto(
      order.getId(),
      order.getStatus(),
      order.getPaymentStatus(),
      order.getTotalAmount(),
      order.getSubtotalAmount(),
      order.getInternalNotes(),
      order.getTotalItems(),
      order.getCreatedAt(),
      order.getUpdatedAt(),
    );
  }
}
