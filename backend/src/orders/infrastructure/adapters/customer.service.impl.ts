import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetCustomerByPhoneQuery } from 'src/customers/application/queries/get-customer-by-phone.query';
import { CustomerOrderDto } from 'src/orders/application/dto/customer-order.dto';
import { CustomerService } from 'src/orders/application/ports/customer.service';
import { CustomerInfrastructureMapper } from '../mappers/customer-infrastructure.mapper';
import { CreateCustomerCommand } from 'src/customers/application/commands/create-customer.commad';
import { CreateCustomerDto } from 'src/orders/application/dto/create-customer.dto';
import { UpdateCustomerCommand } from 'src/customers/application/commands/update-customer.commad';
import { UpdateCustomerDto } from 'src/orders/application/dto/update-customer.dto';
import { GetCustomerWithoutOrdersByIdQuery } from 'src/customers/application/queries/get-customer-without-orders-by-id.query';

@Injectable()
export class CustomerServiceImpl implements CustomerService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly customerInfrastructureMapper: CustomerInfrastructureMapper,
  ) {}

  async getById(id: number): Promise<CustomerOrderDto> {
    const customer = await this.queryBus.execute(
      new GetCustomerWithoutOrdersByIdQuery(id),
    );

    return this.customerInfrastructureMapper.customerDtoToCustomerOrderDto(
      customer,
    );
  }

  async getByPhone(phone: string): Promise<CustomerOrderDto | null> {
    const customer = await this.queryBus.execute(
      new GetCustomerByPhoneQuery(phone),
    );

    if (!customer) {
      return null;
    }

    return this.customerInfrastructureMapper.domainToDto(customer);
  }

  async create(
    updateCustomerDto: CreateCustomerDto,
  ): Promise<CustomerOrderDto> {
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

  async update(
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<CustomerOrderDto> {
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
