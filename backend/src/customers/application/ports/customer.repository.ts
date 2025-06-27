import { Customer } from 'src/customers/domain/entities/customer.entity';

export abstract class CustomerRepository {
  abstract findAll(offset?: number, limit?: number): Promise<Customer[]>;
  abstract findAllActive(offset?: number, limit?: number): Promise<Customer[]>;
  abstract findById(id: number): Promise<Customer | null>;
  abstract findByPhone(phone: string): Promise<Customer | null>;
  abstract findActiveById(id: number): Promise<Customer | null>;
  abstract existsByPhone(phone: string): Promise<boolean>;
  abstract create(customer: Customer): Promise<Customer>;
  abstract update(customer: Customer): Promise<Customer>;
  abstract remove(id: number): Promise<void>;
}
