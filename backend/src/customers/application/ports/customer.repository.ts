import { Customer } from 'src/customers/domain/entities/customer.entity';

export interface CustomerRepository {
  findAll(offset?: number, limit?: number): Promise<Customer[]>;
  findAllActive(offset?: number, limit?: number): Promise<Customer[]>;
  findById(id: number): Promise<Customer | null>;
  findActiveById(id: number): Promise<Customer | null>;
  existsByPhone(phone: string): Promise<boolean>;
  create(customer: Customer): Promise<Customer>;
  update(customer: Customer): Promise<Customer>;
  remove(id: number): Promise<void>;
}
