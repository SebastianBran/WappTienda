import { OrderStatus } from 'src/orders/domain/entities/order-status.enum';
import { CustomerOrderDto } from './customer-order.dto';
import { PaymentStatus } from 'src/orders/domain/entities/payment-status.enum';
import { OrderItemWithProductDto } from './order-item-with-product.dto';

export class OrderWithCustomerDto {
  constructor(
    private id: number,
    private status: OrderStatus,
    private paymentStatus: PaymentStatus,
    private totalAmount: number,
    private subtotalAmount: number,
    private internalNotes: string | null,
    private orderItems: OrderItemWithProductDto[] = [],
    private totalItems: number,
    private customer: CustomerOrderDto,
    private createdAt: Date = new Date(),
    private updatedAt: Date = new Date(),
  ) {}
}
