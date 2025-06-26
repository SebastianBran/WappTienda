import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { OrderService } from 'src/customers/application/ports/order.service';
import { OrderDto } from 'src/customers/application/dto/order.dto';
import { GetOrdersByCustomerIdQuery } from 'src/orders/application/queries/get-orders-by-customer-id.query';
import { OrderInfrastructureMapper } from '../mappers/order-infraestructure.mapper';

@Injectable()
export class OrderServiceImpl implements OrderService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly orderInfrastructureMapper: OrderInfrastructureMapper,
  ) {}

  async getByCustomerId(customerId: number): Promise<OrderDto[]> {
    const orders = await this.queryBus.execute(
      new GetOrdersByCustomerIdQuery(customerId),
    );

    return orders.map((order) =>
      this.orderInfrastructureMapper.domainToDto(order),
    );
  }
}
