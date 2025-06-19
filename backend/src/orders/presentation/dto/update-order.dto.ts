import { IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from 'src/orders/domain/entities/order-status.enum';
import { PaymentStatus } from 'src/orders/domain/entities/payment-status.enum';

export class UpdateOrderDto {
  @IsString()
  @IsOptional()
  internalNotes: string;

  @IsString()
  @IsEnum(OrderStatus)
  @IsOptional()
  status: OrderStatus;

  @IsString()
  @IsEnum(PaymentStatus)
  @IsOptional()
  paymentStatus: PaymentStatus;
}
