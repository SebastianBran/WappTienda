import { Customer } from 'src/customers/domain/entities/customer.entity';
import { CreateCustomerCommand } from '../commands/create-customer.commad';
import { UpdateCustomerCommand } from '../commands/update-customer.commad';
import { CustomerFactory } from 'src/customers/domain/factories/customer.factory';
import { Injectable } from '@nestjs/common';
import { CustomerWithOrdersDto } from '../dto/customer-with-orders.dto';
import { OrderDto } from '../dto/order.dto';

@Injectable()
export class CustomerMapper {
  constructor(private readonly customerFactory: CustomerFactory) {}

  public createCustomerCommandToDomain(
    command: CreateCustomerCommand,
  ): Customer {
    return this.customerFactory.create(
      command.name,
      command.email,
      command.phone,
      command.birthDate,
      command.notes,
    );
  }

  public updateCustomerCommandToDomain(
    command: UpdateCustomerCommand,
    customer: Customer,
  ): Customer {
    if (command.name !== undefined) {
      customer.setName(command.name);
    }

    if (command.email !== undefined) {
      customer.setEmail(command.email);
    }

    if (command.phone !== undefined) {
      customer.setPhone(command.phone);
    }

    if (command.birthDate !== undefined) {
      customer.setBirthDate(command.birthDate);
    }

    if (command.notes !== undefined) {
      customer.setNotes(command.notes);
    }

    return customer;
  }

  public toCustomerWithOrdersDto(
    customer: Customer,
    orders: OrderDto[],
  ): CustomerWithOrdersDto {
    return new CustomerWithOrdersDto(
      customer.getId(),
      customer.getName(),
      customer.getEmail(),
      customer.getPhone(),
      customer.getBirthDate(),
      customer.getNotes(),
      customer.isDeleted(),
      customer.getCreatedAt(),
      customer.getUpdatedAt(),
      orders,
    );
  }
}
