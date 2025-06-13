import { Command } from '@nestjs/cqrs';
import { Customer } from 'src/customers/domain/entities/customer.entity';

export class CreateCustomerCommand extends Command<Customer> {
  constructor(
    public readonly name: string,
    public readonly phone: string,
    public readonly email: string | null,
    public readonly birthDate: Date | null,
    public readonly notes: string | null,
  ) {
    super();
  }
}
