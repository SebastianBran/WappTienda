import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { OrderStatus } from '../entities/order-status.enum';
import { PaymentStatus } from '../entities/payment-status.enum';

export class UpdateOrderDto extends PartialType(
  OmitType(CreateOrderDto, ['orderItems', 'customer'] as const),
) {
  @IsString()
  internalNotes: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(OrderStatus)
  status: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(PaymentStatus)
  paymentStatus: string;
}
