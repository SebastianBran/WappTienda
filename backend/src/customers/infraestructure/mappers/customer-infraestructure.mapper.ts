import { Customer } from 'src/customers/domain/entities/customer.entity';
import { CustomerEntity } from '../entities/customer.typeorm-entity';
import { Order } from 'src/customers/domain/entities/order.entity';

export class CustomerInfraestructureMapper {
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
    let orders: Order[] = [];
    if (customerEntity.orders?.length > 0) {
      orders = customerEntity.orders.map((orderEntity) => {
        return new Order(
          orderEntity.id,
          orderEntity.status,
          orderEntity.paymentStatus,
          orderEntity.totalAmount,
          orderEntity.subtotalAmount,
          orderEntity.internalNotes,
          orderEntity.totalItems,
          orderEntity.created_at,
          orderEntity.updated_at,
        );
      });
    }

    return new Customer(
      customerEntity.id,
      customerEntity.name,
      customerEntity.email,
      customerEntity.phone,
      customerEntity.birthDate,
      customerEntity.notes,
      orders,
      customerEntity.deleted,
      customerEntity.created_at,
      customerEntity.updated_at,
    );
  }
}
