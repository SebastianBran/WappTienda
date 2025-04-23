import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { Product } from 'src/products/entities/product.entity';
import { Customer } from 'src/customers/entities/customer.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  findAll(paginationQueryDto: PaginationQueryDto): Promise<Order[]> {
    const { limit, offset } = paginationQueryDto;

    return this.orderRepository.find({
      relations: ['orderItems', 'orderItems.product', 'customer'],
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['orderItems', 'orderItems.product', 'customer'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const customer = await this.customerRepository.findOneBy({
      id: createOrderDto.customerId,
    });

    if (!customer) {
      throw new NotFoundException(
        `Customer with ID ${createOrderDto.customerId} not found`,
      );
    }

    const orderItems = await Promise.all(
      createOrderDto.orderItems.map((item) => this.preloadOrderItem(item)),
    );

    const totalAmount = orderItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    const order = this.orderRepository.create({
      ...createOrderDto,
      totalAmount,
      orderItems,
    });

    await this.orderRepository.save(order);

    return this.findOne(order.id);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderRepository.preload({
      id,
      ...updateOrderDto,
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    await this.orderRepository.save(order);

    return this.findOne(id);
  }

  async preloadOrderItem(item: CreateOrderItemDto): Promise<OrderItem> {
    const product = await this.productRepository.findOneBy({
      id: item.productId,
      deleted: false,
    });

    if (!product) {
      throw new NotFoundException(
        `Product with ID ${item.productId} not found`,
      );
    }

    const orderItem = this.orderItemRepository.create({
      ...item,
      product,
    });

    return orderItem;
  }

  async remove(id: number): Promise<Order> {
    const order = await this.findOne(id);

    if (order) {
      return await this.orderRepository.remove(order);
    }

    throw new NotFoundException(`Order with ID ${id} not found`);
  }
}
