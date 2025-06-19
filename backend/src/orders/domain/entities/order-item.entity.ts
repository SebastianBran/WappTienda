import { Product } from './product.entity';

export class OrderItem {
  constructor(
    private id: number,
    private quantity: number,
    private price: number,
    private product: Product,
    private createdAt: Date = new Date(),
    private updatedAt: Date = new Date(),
  ) {}

  public getId(): number {
    return this.id;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public getPrice(): number {
    return this.price;
  }

  public getProduct(): Product {
    return this.product;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public setQuantity(quantity: number): void {
    this.quantity = quantity;
  }

  public setPrice(price: number): void {
    this.price = price;
  }

  public setProduct(product: Product): void {
    this.product = product;
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }
}
