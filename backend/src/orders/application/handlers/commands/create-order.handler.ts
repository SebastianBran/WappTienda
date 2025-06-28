import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../../commands/create-order.command';
import { OrderRepository } from '../../ports/order.repository';
import { OrderItem } from 'src/orders/domain/entities/order-item.entity';
import { OrderFactory } from 'src/orders/domain/factories/order.factory';
import { CreateCustomerDto } from '../../dto/create-customer.dto';
import { CreateOrderItemDto } from '../../dto/create-order-item.dto';
import { OrderItemFactory } from 'src/orders/domain/factories/order-item.factory';
import { CustomerService } from '../../ports/customer.service';
import { CustomerOrderDto } from '../../dto/customer-order.dto';
import { UpdateCustomerDto } from '../../dto/update-customer.dto';
import { ProductService } from '../../ports/product.service';
import { OrderWithCustomerDto } from '../../dto/order-with-customer.dto';
import { OrderItemWithProductDto } from '../../dto/order-item-with-product.dto';
import { OrderItemMapper } from '../../mappers/order-item.mapper';
import { OrderMapper } from '../../mappers/order.mapper';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler
  implements ICommandHandler<CreateOrderCommand, OrderWithCustomerDto>
{
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly customerService: CustomerService,
    private readonly orderFactory: OrderFactory,
    private readonly productService: ProductService,
    private readonly orderItemMapper: OrderItemMapper,
    private readonly orderMapper: OrderMapper,
  ) {}

  async execute(command: CreateOrderCommand): Promise<OrderWithCustomerDto> {
    const customer = await this.createOrUpdateCustomer(
      command.createCustomerDto,
    );

    const orderItems = await Promise.all(
      command.createOrderItemDto.map((item) => this.preloadOrderItem(item)),
    );

    const order = this.orderFactory.create(customer.getId(), orderItems);

    const createdOrder = await this.orderRepository.create(order);

    const orderItemsWithProducts = await this.getOrderItemsWithProducts(
      createdOrder.getOrderItems(),
    );

    return this.orderMapper.toOrderWithCustomerDto(
      createdOrder,
      customer,
      orderItemsWithProducts,
    );
  }

  private async createOrUpdateCustomer(
    createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerOrderDto> {
    const customerExists = await this.getExistingCustomer(
      createCustomerDto.phone,
    );

    if (customerExists) {
      return this.updateCustomer(customerExists, createCustomerDto);
    } else {
      return this.createCustomer(createCustomerDto);
    }
  }

  private async getExistingCustomer(
    phone: string,
  ): Promise<CustomerOrderDto | null> {
    const existingCustomer = await this.customerService.getByPhone(phone);
    return existingCustomer;
  }

  private async updateCustomer(
    existingCustomer: CustomerOrderDto,
    createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerOrderDto> {
    return this.customerService.update(
      new UpdateCustomerDto(
        existingCustomer.getId(),
        createCustomerDto.name,
        createCustomerDto.phone,
        createCustomerDto.email,
        createCustomerDto.birthDate,
        createCustomerDto.notes,
      ),
    );
  }

  private async createCustomer(
    createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerOrderDto> {
    return this.customerService.create(createCustomerDto);
  }

  private async preloadOrderItem(item: CreateOrderItemDto): Promise<OrderItem> {
    const product = await this.productService.getById(item.productId);
    return OrderItemFactory.create(item.quantity, item.price, product.getId());
  }

  private async getOrderItemsWithProducts(
    orderItems: OrderItem[],
  ): Promise<OrderItemWithProductDto[]> {
    return Promise.all(
      orderItems.map(async (item) => {
        const product = await this.productService.getById(item.getProductId());
        return this.orderItemMapper.toOrderItemWithProductDto(item, product);
      }),
    );
  }
}
