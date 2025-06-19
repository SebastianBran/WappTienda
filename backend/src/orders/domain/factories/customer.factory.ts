import { Customer } from '../entities/customer.entity';

export class CustomerFactory {
  public static create(
    name: string,
    phone: string,
    email: string | null,
    birthDate: Date | null,
    notes: string | null,
  ): Customer {
    return new Customer(0, name, email, phone, birthDate, notes);
  }
}
