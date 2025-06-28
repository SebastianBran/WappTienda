import { Customer } from 'src/customers/domain/entities/customer.entity';
import { Injectable } from '@nestjs/common';
import { CustomerOrderDto } from 'src/orders/application/dto/customer-order.dto';
import { CustomerDto } from 'src/customers/application/dto/customer.dto';

@Injectable()
export class CustomerInfrastructureMapper {
  public domainToDto(customer: Customer): CustomerOrderDto {
    return new CustomerOrderDto(
      customer.getId(),
      customer.getName(),
      customer.getEmail(),
      customer.getPhone(),
      customer.getBirthDate(),
      customer.getNotes(),
      customer.isDeleted(),
      customer.getCreatedAt(),
      customer.getUpdatedAt(),
    );
  }

  public customerDtoToCustomerOrderDto(
    customerDto: CustomerDto,
  ): CustomerOrderDto {
    return new CustomerOrderDto(
      customerDto.getId(),
      customerDto.getName(),
      customerDto.getEmail(),
      customerDto.getPhone(),
      customerDto.getBirthDate(),
      customerDto.getNotes(),
      customerDto.isDeleted(),
      customerDto.getCreatedAt(),
      customerDto.getUpdatedAt(),
    );
  }
}
