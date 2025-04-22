import { IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { OrderStatus } from '../entities/order-status.enum';
import { PaymentStatus } from '../entities/payment-status.enum';
import { CreateOrderItemDto } from './create-order-item.dto';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(OrderStatus)
  status: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(PaymentStatus)
  paymentStatus: string;

  @IsNotEmpty()
  @IsString()
  internalNotes: string;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  @IsNotEmpty()
  orderItems: CreateOrderItemDto[];
}
