import { Customer } from './customer.entity';
import { OrderItem } from './order-item.entity';
import { OrderStatus } from './order-status.enum';
import { PaymentStatus } from './payment-status.enum';

export class Order {
  constructor(
    private id: number,
    private status: OrderStatus,
    private paymentStatus: PaymentStatus,
    private totalAmount: number,
    private subtotalAmount: number,
    private internalNotes: string | null,
    private orderItems: OrderItem[] = [],
    private totalItems: number,
    private customer: Customer,
    private createdAt: Date = new Date(),
    private updatedAt: Date = new Date(),
  ) {}

  public getId(): number {
    return this.id;
  }

  public getStatus(): OrderStatus {
    return this.status;
  }

  public getPaymentStatus(): PaymentStatus {
    return this.paymentStatus;
  }

  public getTotalAmount(): number {
    return this.totalAmount;
  }

  public getSubtotalAmount(): number {
    return this.subtotalAmount;
  }

  public getInternalNotes(): string | null {
    return this.internalNotes;
  }

  public getOrderItems(): OrderItem[] {
    return this.orderItems;
  }

  public getTotalItems(): number {
    return this.totalItems;
  }

  public getCustomer(): Customer {
    return this.customer;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public setStatus(status: OrderStatus): void {
    this.status = status;
  }

  public setPaymentStatus(paymentStatus: PaymentStatus): void {
    this.paymentStatus = paymentStatus;
  }

  public setTotalAmount(totalAmount: number): void {
    this.totalAmount = totalAmount;
  }

  public setSubtotalAmount(subtotalAmount: number): void {
    this.subtotalAmount = subtotalAmount;
  }

  public setInternalNotes(internalNotes: string | null): void {
    this.internalNotes = internalNotes;
  }

  public setOrderItems(orderItems: OrderItem[]): void {
    this.orderItems = orderItems;
    this.totalItems = orderItems.length;
  }

  public setTotalItems(totalItems: number): void {
    this.totalItems = totalItems;
  }

  public setCustomer(customer: Customer): void {
    this.customer = customer;
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }
}
