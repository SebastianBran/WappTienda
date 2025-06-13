import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCustomerCommand } from '../../commands/delete-customer.commad';
import { Inject, NotFoundException } from '@nestjs/common';
import { CustomerRepository } from '../../ports/customer.repository';

@CommandHandler(DeleteCustomerCommand)
export class DeleteCustomerHandler
  implements ICommandHandler<DeleteCustomerCommand>
{
  constructor(
    @Inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository,
  ) {}

  async execute(command: DeleteCustomerCommand): Promise<any> {
    const { id } = command;

    const customer = await this.customerRepository.findActiveById(id);

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    customer.setDeleted(true);

    await this.customerRepository.update(customer);
  }
}
