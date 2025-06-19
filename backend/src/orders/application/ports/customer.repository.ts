import { Customer } from 'src/orders/domain/entities/customer.entity';

export interface CustomerRepository {
  findByPhone(phone: string): Promise<Customer | null>;
}
