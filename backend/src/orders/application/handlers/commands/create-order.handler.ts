import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../../commands/create-order.command';
import { Order } from 'src/orders/domain/entities/order.entity';
import { Inject, NotFoundException } from '@nestjs/common';
import { OrderRepository } from '../../ports/order.repository';
import { ProductRepository } from '../../ports/product.repository';
import { OrderStatus } from 'src/orders/domain/entities/order-status.enum';
import { PaymentStatus } from 'src/orders/domain/entities/payment-status.enum';
import { OrderItem } from 'src/orders/domain/entities/order-item.entity';
import { OrderFactory } from 'src/orders/domain/factories/order.factory';
import { CreateCustomerDto } from '../../dto/create-customer.dto';
import { CreateOrderItemDto } from '../../dto/create-order-item.dto';
import { OrderItemFactory } from 'src/orders/domain/factories/orede-item.factory';
import { CustomerService } from '../../ports/customer.service';
import { CustomerDto } from '../../dto/customer.dto';
import { UpdateCustomerDto } from '../../dto/update-customer.dto';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: OrderRepository,
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
    private readonly customerService: CustomerService,
  ) {}

  async execute(command: CreateOrderCommand): Promise<Order> {
    await this.createCustomer(command.createCustomerDto);

    const orderItems = await Promise.all(
      command.createOrderItemDto.map((item) => this.preloadOrderItem(item)),
    );

    const order = OrderFactory.create(
      OrderStatus.PENDING,
      PaymentStatus.PENDING,
      null, // internal notes
      orderItems,
    );

    return this.orderRepository.create(order);
  }

  private async createCustomer(
    createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerDto> {
    const existingCustomer = await this.customerService.getByPhone(
      createCustomerDto.phone,
    );

    if (existingCustomer) {
      return this.customerService.update(
        new UpdateCustomerDto(
          existingCustomer.id,
          createCustomerDto.name,
          createCustomerDto.phone,
          createCustomerDto.email,
          createCustomerDto.birthDate,
          createCustomerDto.notes,
        ),
      );
    }

    return this.customerService.create(createCustomerDto);
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
