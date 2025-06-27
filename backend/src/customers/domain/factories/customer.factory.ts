import { Injectable } from '@nestjs/common';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomerFactory {
  public create(
    name: string,
    email: string | null,
    phone: string,
    birthDate: Date | null,
    notes: string | null,
  ): Customer {
    return new Customer(0, name, email, phone, birthDate, notes);
  }
}
