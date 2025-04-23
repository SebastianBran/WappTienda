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
    private customerRepository: Repository<Customer>,
  ) {}

  findAll(paginationQueryDto: PaginationQueryDto): Promise<Customer[]> {
    const { limit, offset } = paginationQueryDto;
    return this.customerRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOneBy({
      id,
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return customer;
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    console.log('createCustomerDto', createCustomerDto);
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

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return this.customerRepository.save(customer);
  }

  async remove(id: number): Promise<Customer> {
    const customer = await this.findOne(id);

    if (customer) {
      return await this.customerRepository.remove(customer);
    }

    throw new NotFoundException(`Customer with ID ${id} not found`);
  }
}
