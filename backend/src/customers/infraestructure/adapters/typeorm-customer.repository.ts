import { InjectRepository } from '@nestjs/typeorm';
import { CustomerRepository } from 'src/customers/application/ports/customer.repository';
import { Customer } from 'src/customers/domain/entities/customer.entity';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../entities/customer.typeorm-entity';
import { CustomerInfraestructureMapper } from '../mappers/customer-infraestructure.mapper';

export class TypeOrmCustomerRepository implements CustomerRepository {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly repository: Repository<CustomerEntity>,
  ) {}

  async findAll(offset?: number, limit?: number): Promise<Customer[]> {
    const customersEntities = await this.repository.find({
      relations: ['orders'],
      skip: offset,
      take: limit,
    });
    return customersEntities.map((entity) =>
      CustomerInfraestructureMapper.entityToDomain(entity),
    );
  }

  async findAllActive(offset?: number, limit?: number): Promise<Customer[]> {
    const customersEntities = await this.repository.find({
      where: { deleted: false },
      skip: offset,
      take: limit,
      relations: ['orders'],
    });
    return customersEntities.map((entity) =>
      CustomerInfraestructureMapper.entityToDomain(entity),
    );
  }

  async findById(id: number): Promise<Customer | null> {
    const customerEntity = await this.repository.findOne({
      where: { id },
      relations: ['orders'],
    });
    if (!customerEntity) {
      return null;
    }
    return CustomerInfraestructureMapper.entityToDomain(customerEntity);
  }

  async findActiveById(id: number): Promise<Customer | null> {
    const customerEntity = await this.repository.findOne({
      where: { id, deleted: false },
      relations: ['orders'],
    });
    if (!customerEntity) {
      return null;
    }
    return CustomerInfraestructureMapper.entityToDomain(customerEntity);
  }

  existsByPhone(phone: string): Promise<boolean> {
    return this.repository.existsBy({ phone, deleted: false });
  }

  async create(customer: Customer): Promise<Customer> {
    const customerEntity =
      CustomerInfraestructureMapper.domainToEntity(customer);
    const customerCreated = this.repository.create(customerEntity);
    const newCustomer = await this.repository.save(customerCreated);
    return CustomerInfraestructureMapper.entityToDomain(newCustomer);
  }

  async update(customer: Customer): Promise<Customer> {
    const customerEntity =
      CustomerInfraestructureMapper.domainToEntity(customer);
    const updatedEntity = await this.repository.save(customerEntity);
    return CustomerInfraestructureMapper.entityToDomain(updatedEntity);
  }

  async remove(id: number): Promise<void> {
    const customerEntity = await this.repository.findOne({
      where: { id, deleted: false },
    });
    if (!customerEntity) {
      throw new Error('Customer not found');
    }
    await this.repository.remove(customerEntity);
  }
}
