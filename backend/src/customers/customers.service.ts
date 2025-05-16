import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  findAll(paginationQueryDto: PaginationQueryDto): Promise<Customer[]> {
    const { limit, offset } = paginationQueryDto;
    return this.customerRepository.find({
      where: { deleted: false },
      relations: ['orders'],
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { id, deleted: false },
      relations: ['orders'],
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return customer;
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customerRepository.create(createCustomerDto);
    return await this.customerRepository.save(customer);
  }

  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    const customer = await this.customerRepository.preload({
      id,
      ...updateCustomerDto,
    });

    if (!customer || customer.deleted) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return this.customerRepository.save(customer);
  }

  async remove(id: number): Promise<Customer> {
    const customer = await this.findOne(id);

    if (customer) {
      customer.deleted = true;
      return await this.customerRepository.save(customer);
    }

    throw new NotFoundException(`Customer with ID ${id} not found`);
  }
}
