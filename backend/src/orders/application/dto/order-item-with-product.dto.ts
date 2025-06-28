import { OrderItemProductDto } from './order-item-product.dto';

export class OrderItemWithProductDto {
  constructor(
    private id: number,
    private quantity: number,
    private price: number,
    private product: OrderItemProductDto,
    private createdAt: Date,
    private updatedAt: Date,
  ) {}
}
