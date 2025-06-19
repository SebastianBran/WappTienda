import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateOrderItemDto } from './create-order-item.dto';
import { Type } from 'class-transformer';
import { CreateCustomerDto } from './create-customer.dto';

export class CreateOrderDto {
  @Type(() => CreateCustomerDto)
  @IsNotEmpty()
  customer: CreateCustomerDto;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  @IsNotEmpty()
  orderItems: CreateOrderItemDto[];
}
