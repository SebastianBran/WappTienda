enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  DELIVERED = 'DELIVERED',
}

enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  REFUNDED = 'REFUNDED',
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export class OrderDto {
  constructor(
    private id: number,
    private status: OrderStatus,
    private paymentStatus: PaymentStatus,
    private totalAmount: number,
    private subtotalAmount: number,
    private internalNotes: string | null,
    private totalItems: number,
    private createdAt: Date,
    private updatedAt: Date,
  ) {}
}
