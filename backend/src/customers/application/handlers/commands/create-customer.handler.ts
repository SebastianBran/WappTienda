import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCustomerCommand } from '../../commands/create-customer.commad';
import { Customer } from 'src/customers/domain/entities/customer.entity';
import { BadRequestException } from '@nestjs/common';
import { CustomerRepository } from '../../ports/customer.repository';
import { CustomerMapper } from '../../mappers/customer.mapper';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler
  implements ICommandHandler<CreateCustomerCommand>
{
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly customerMapper: CustomerMapper,
  ) {}

  async execute(command: CreateCustomerCommand): Promise<Customer> {
    const { name, phone } = command;

    if (!name) {
      throw new BadRequestException('Name is required');
    }

    if (!phone) {
      throw new BadRequestException('Phone number is required');
    }

    const customerExists: boolean =
      await this.customerRepository.existsByPhone(phone);

    if (customerExists) {
      throw new BadRequestException(
        `Customer with phone ${phone} already exists`,
      );
    }

    const customer: Customer =
      this.customerMapper.createCustomerCommandToDomain(command);

    return this.customerRepository.create(customer);
  }
}
