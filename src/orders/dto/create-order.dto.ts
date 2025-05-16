import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateOrderItemDto } from './create-order-item.dto';
import { Type } from 'class-transformer';
import { CreateCustomerDto } from 'src/customers/dto/create-customer.dto';

export class CreateOrderDto {
  @Type(() => CreateCustomerDto)
  @IsNotEmpty()
  customer: CreateCustomerDto;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  @IsNotEmpty()
  orderItems: CreateOrderItemDto[];
}
