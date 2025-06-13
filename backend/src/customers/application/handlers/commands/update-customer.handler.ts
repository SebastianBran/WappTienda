import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCustomerCommand } from '../../commands/update-customer.commad';
import { CustomerRepository } from '../../ports/customer.repository';
import { Customer } from 'src/customers/domain/entities/customer.entity';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { CustomerMapper } from '../../mappers/customer.mapper';

@CommandHandler(UpdateCustomerCommand)
export class UpdateCustomerHandler
  implements ICommandHandler<UpdateCustomerCommand>
{
  constructor(
    @Inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository,
  ) {}

  async execute(command: UpdateCustomerCommand): Promise<Customer> {
    const { id } = command;

    const customer = await this.customerRepository.findActiveById(id);

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    const updatedCustomer = CustomerMapper.updateCustomerCommandToDomain(
      command,
      customer,
    );

    if (!updatedCustomer.getPhone()) {
      throw new BadRequestException('Phone number is required');
    }

    return this.customerRepository.update(updatedCustomer);
  }
}
