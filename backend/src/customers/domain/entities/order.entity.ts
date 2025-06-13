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
    private totalItems: number,
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

  public getTotalItems(): number {
    return this.totalItems;
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

  public setTotalItems(totalItems: number): void {
    this.totalItems = totalItems;
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }
}
