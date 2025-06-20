import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../../commands/create-order.command';
import { Order } from 'src/orders/domain/entities/order.entity';
import { Inject, NotFoundException } from '@nestjs/common';
import { OrderRepository } from '../../ports/order.repository';
import { CustomerRepository } from '../../ports/customer.repository';
import { ProductRepository } from '../../ports/product.repository';
import { CustomerFactory } from 'src/orders/domain/factories/customer.factory';
import { OrderStatus } from 'src/orders/domain/entities/order-status.enum';
import { PaymentStatus } from 'src/orders/domain/entities/payment-status.enum';
import { OrderItem } from 'src/orders/domain/entities/order-item.entity';
import { OrderFactory } from 'src/orders/domain/factories/order.factory';
import { CreateCustomerDto } from '../../dto/create-customer.dto';
import { CreateOrderItemDto } from '../../dto/create-order-item.dto';
import { OrderItemFactory } from 'src/orders/domain/factories/orede-item.factory';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: OrderRepository,
    @Inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository,
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(command: CreateOrderCommand): Promise<Order> {
    const customer = await this.preloadCustomer(command.createCustomerDto);

    const orderItems = await Promise.all(
      command.createOrderItemDto.map((item) => this.preloadOrderItem(item)),
    );

    const order = OrderFactory.create(
      OrderStatus.PENDING,
      PaymentStatus.PENDING,
      null, // internal notes
      orderItems,
      customer,
    );

    return this.orderRepository.create(order);
  }

  private async preloadCustomer(createCustomerDto: CreateCustomerDto) {
    const existingCustomer = await this.customerRepository.findByPhone(
      createCustomerDto.phone,
    );

    if (existingCustomer) {
      existingCustomer.setName(createCustomerDto.name);
      existingCustomer.setEmail(createCustomerDto.email);
      existingCustomer.setBirthDate(createCustomerDto.birthDate);
      existingCustomer.setNotes(createCustomerDto.notes);
      return existingCustomer;
    }

    return CustomerFactory.create(
      createCustomerDto.name,
      createCustomerDto.phone,
      createCustomerDto.email,
      createCustomerDto.birthDate,
      createCustomerDto.notes,
    );
  }

  private async preloadOrderItem(item: CreateOrderItemDto): Promise<OrderItem> {
    const product = await this.productRepository.findById(item.productId);

    if (!product) {
      throw new NotFoundException(
        `Product with ID ${item.productId} not found`,
      );
    }

    return OrderItemFactory.create(item.quantity, item.price, product);
  }
}
