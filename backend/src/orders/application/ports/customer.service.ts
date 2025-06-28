import { CreateCustomerDto } from '../dto/create-customer.dto';
import { CustomerOrderDto } from '../dto/customer-order.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';

export abstract class CustomerService {
  abstract getById(id: number): Promise<CustomerOrderDto>;
  abstract getByPhone(phone: string): Promise<CustomerOrderDto | null>;
  abstract create(
    createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerOrderDto>;
  abstract update(
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<CustomerOrderDto>;
}
