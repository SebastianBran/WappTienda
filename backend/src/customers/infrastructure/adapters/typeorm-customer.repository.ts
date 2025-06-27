import { InjectRepository } from '@nestjs/typeorm';
import { CustomerRepository } from 'src/customers/application/ports/customer.repository';
import { Customer } from 'src/customers/domain/entities/customer.entity';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../entities/customer.typeorm-entity';
import { CustomerInfrastructureMapper } from '../mappers/customer-infrastructure.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmCustomerRepository implements CustomerRepository {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly repository: Repository<CustomerEntity>,
    private readonly customerInfrastructureMapper: CustomerInfrastructureMapper,
  ) {}

  async findAll(offset?: number, limit?: number): Promise<Customer[]> {
    const customersEntities = await this.repository.find({
      skip: offset,
      take: limit,
    });
    return customersEntities.map((entity) =>
      this.customerInfrastructureMapper.entityToDomain(entity),
    );
  }

  async findAllActive(offset?: number, limit?: number): Promise<Customer[]> {
    const customersEntities = await this.repository.find({
      where: { deleted: false },
      skip: offset,
      take: limit,
    });
    return customersEntities.map((entity) =>
      this.customerInfrastructureMapper.entityToDomain(entity),
    );
  }

  async findById(id: number): Promise<Customer | null> {
    const customerEntity = await this.repository.findOne({
      where: { id },
    });
    if (!customerEntity) {
      return null;
    }
    return this.customerInfrastructureMapper.entityToDomain(customerEntity);
  }

  async findActiveById(id: number): Promise<Customer | null> {
    const customerEntity = await this.repository.findOne({
      where: { id, deleted: false },
    });
    if (!customerEntity) {
      return null;
    }
    return this.customerInfrastructureMapper.entityToDomain(customerEntity);
  }

  async findByPhone(phone: string): Promise<Customer | null> {
    const customerEntity = await this.repository.findOne({
      where: { phone, deleted: false },
    });
    if (!customerEntity) {
      return null;
    }
    return this.customerInfrastructureMapper.entityToDomain(customerEntity);
  }

  existsByPhone(phone: string): Promise<boolean> {
    return this.repository.existsBy({ phone, deleted: false });
  }

  async create(customer: Customer): Promise<Customer> {
    const customerEntity =
      this.customerInfrastructureMapper.domainToEntity(customer);
    const customerCreated = this.repository.create(customerEntity);
    const newCustomer = await this.repository.save(customerCreated);
    return this.customerInfrastructureMapper.entityToDomain(newCustomer);
  }

  async update(customer: Customer): Promise<Customer> {
    const customerEntity =
      this.customerInfrastructureMapper.domainToEntity(customer);
    const updatedEntity = await this.repository.save(customerEntity);
    return this.customerInfrastructureMapper.entityToDomain(updatedEntity);
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
