import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetCustomerByPhoneQuery } from 'src/customers/application/queries/get-customer-by-phone.query';
import { CustomerDto } from 'src/orders/application/dto/customer.dto';
import { CustomerService } from 'src/orders/application/ports/customer.service';
import { CustomerInfrastructureMapper } from '../mappers/customer-infrastructure.mapper';
import { CreateCustomerCommand } from 'src/customers/application/commands/create-customer.commad';
import { CreateCustomerDto } from 'src/orders/application/dto/create-customer.dto';
import { UpdateCustomerCommand } from 'src/customers/application/commands/update-customer.commad';
import { UpdateCustomerDto } from 'src/orders/application/dto/update-customer.dto';

@Injectable()
export class CustomerServiceImpl implements CustomerService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly customerInfrastructureMapper: CustomerInfrastructureMapper,
  ) {}

  async getByPhone(phone: string): Promise<CustomerDto | null> {
    const customer = await this.queryBus.execute(
      new GetCustomerByPhoneQuery(phone),
    );

    if (!customer) {
      return null;
    }

    return this.customerInfrastructureMapper.domainToDto(customer);
  }

  async create(updateCustomerDto: CreateCustomerDto): Promise<CustomerDto> {
    const customer = await this.commandBus.execute(
      new CreateCustomerCommand(
        updateCustomerDto.name,
        updateCustomerDto.phone,
        updateCustomerDto.email,
        updateCustomerDto.birthDate,
        updateCustomerDto.notes,
      ),
    );

    return this.customerInfrastructureMapper.domainToDto(customer);
  }

  async update(updateCustomerDto: UpdateCustomerDto): Promise<CustomerDto> {
    const customer = await this.commandBus.execute(
      new UpdateCustomerCommand(
        updateCustomerDto.id,
        updateCustomerDto.name,
        updateCustomerDto.phone,
        updateCustomerDto.email,
        updateCustomerDto.birthDate,
        updateCustomerDto.notes,
      ),
    );

    return this.customerInfrastructureMapper.domainToDto(customer);
  }
}
