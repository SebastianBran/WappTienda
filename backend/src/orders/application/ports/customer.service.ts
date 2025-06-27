import { CreateCustomerDto } from '../dto/create-customer.dto';
import { CustomerDto } from '../dto/customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';

export abstract class CustomerService {
  abstract getByPhone(phone: string): Promise<CustomerDto | null>;
  abstract create(createCustomerDto: CreateCustomerDto): Promise<CustomerDto>;
  abstract update(updateCustomerDto: UpdateCustomerDto): Promise<CustomerDto>;
}
