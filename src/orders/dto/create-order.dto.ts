import { IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { OrderStatus } from '../entities/order-status.enum';
import { PaymentStatus } from '../entities/payment-status.enum';
import { CreateOrderItemDto } from './create-order-item.dto';
import { Type } from 'class-transformer';
import { CreateCustomerDto } from 'src/customers/dto/create-customer.dto';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(OrderStatus)
  status: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(PaymentStatus)
  paymentStatus: string;

  @IsString()
  internalNotes: string;

  @Type(() => CreateCustomerDto)
  @IsNotEmpty()
  customer: CreateCustomerDto;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  @IsNotEmpty()
  orderItems: CreateOrderItemDto[];
}
