export enum ProductType {
  VIRTUAL = 'VIRTUAL',
  PHYSICAL = 'PHYSICAL',
}

export class OrderItemProductDto {
  constructor(
    private id: number,
    private sku: string | null,
    private name: string,
    private type: ProductType,
    private description: string | null,
    private price: number,
    private salesPrice: number,
    private trackInventory: boolean,
    private totalInventory: number,
    private visible: boolean,
    private deleted: boolean,
    private createdAt: Date,
    private updatedAt: Date,
  ) {}

  public getId(): number {
    return this.id;
  }
}
