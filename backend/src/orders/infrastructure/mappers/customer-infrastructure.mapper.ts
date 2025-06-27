import { Customer } from 'src/customers/domain/entities/customer.entity';
import { CustomerEntity } from '../entities/customer.typeorm-entity';
import { Injectable } from '@nestjs/common';
import { CustomerDto } from 'src/orders/application/dto/customer.dto';

@Injectable()
export class CustomerInfrastructureMapper {
  public domainToEntity(customer: Customer): CustomerEntity {
    const customerEntity = new CustomerEntity();
    customerEntity.id = customer.getId();
    customerEntity.name = customer.getName();
    customerEntity.email = customer.getEmail();
    customerEntity.phone = customer.getPhone();
    customerEntity.birthDate = customer.getBirthDate();
    customerEntity.notes = customer.getNotes();
    customerEntity.deleted = customer.isDeleted();
    return customerEntity;
  }

  public entityToDomain(customerEntity: CustomerEntity): Customer {
    return new Customer(
      customerEntity.id,
      customerEntity.name,
      customerEntity.email,
      customerEntity.phone,
      customerEntity.birthDate,
      customerEntity.notes,
      customerEntity.deleted,
      customerEntity.created_at,
      customerEntity.updated_at,
    );
  }

  public domainToDto(customer: Customer): CustomerDto {
    return new CustomerDto(
      customer.getId(),
      customer.getName(),
      customer.getEmail(),
      customer.getPhone(),
      customer.getBirthDate(),
      customer.getNotes(),
      customer.isDeleted(),
      customer.getCreatedAt(),
      customer.getUpdatedAt(),
    );
  }
}
