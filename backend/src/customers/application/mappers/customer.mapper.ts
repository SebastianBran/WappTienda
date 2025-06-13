import { Customer } from 'src/customers/domain/entities/customer.entity';
import { CreateCustomerCommand } from '../commands/create-customer.commad';
import { UpdateCustomerCommand } from '../commands/update-customer.commad';

export class CustomerMapper {
  public static createCustomerCommandToDomain(
    command: CreateCustomerCommand,
  ): Customer {
    return new Customer(
      0, // Assuming ID is auto-generated
      command.name,
      command.email,
      command.phone,
      command.birthDate,
      command.notes,
    );
  }

  public static updateCustomerCommandToDomain(
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
}
