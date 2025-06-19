import { Customer } from 'src/orders/domain/entities/customer.entity';
import { CustomerEntity } from '../entities/customer.typeorm-entity';

export class CustomerInfrastructureMapper {
  static domainToEntity(customer: Customer): CustomerEntity {
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

  static entityToDomain(customerEntity: CustomerEntity): Customer {
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
}
