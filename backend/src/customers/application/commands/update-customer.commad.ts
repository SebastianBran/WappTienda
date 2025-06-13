import { Command } from '@nestjs/cqrs';
import { Customer } from 'src/customers/domain/entities/customer.entity';

export class UpdateCustomerCommand extends Command<Customer> {
  constructor(
    public readonly id: number,
    public readonly name?: string,
    public readonly phone?: string,
    public readonly email?: string,
    public readonly birthDate?: Date,
    public readonly notes?: string,
  ) {
    super();
  }
}
