import { InjectRepository } from '@nestjs/typeorm';
import { CustomerRepository } from 'src/orders/application/ports/customer.repository';
import { Customer } from 'src/orders/domain/entities/customer.entity';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../entities/customer.typeorm-entity';
import { CustomerInfrastructureMapper } from '../mappers/customer-infrastructure.mapper';

export class TypeOrmCustomerRepository implements CustomerRepository {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  async findByPhone(phone: string): Promise<Customer | null> {
    const customerEntity = await this.customerRepository.findOne({
      where: { phone },
    });

    if (!customerEntity) {
      return null;
    }

    return CustomerInfrastructureMapper.entityToDomain(customerEntity);
  }
}
