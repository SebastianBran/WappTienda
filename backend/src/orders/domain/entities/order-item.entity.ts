export class OrderItem {
  constructor(
    private id: number,
    private quantity: number,
    private price: number,
    private productId: number,
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

  public getProductId(): number {
    return this.productId;
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

  public setProductId(productId: number): void {
    this.productId = productId;
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }
}
