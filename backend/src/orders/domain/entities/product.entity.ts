import { ProductType } from './product-type.enum';

export class Product {
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
    private deleted: boolean = false,
    private createdAt: Date = new Date(),
    private updatedAt: Date = new Date(),
  ) {}

  public getId(): number {
    return this.id;
  }

  public getSku(): string | null {
    return this.sku;
  }

  public getName(): string {
    return this.name;
  }

  public getType(): ProductType {
    return this.type;
  }

  public getDescription(): string | null {
    return this.description;
  }

  public getPrice(): number {
    return this.price;
  }

  public getSalesPrice(): number {
    return this.salesPrice;
  }

  public isTrackInventory(): boolean {
    return this.trackInventory;
  }

  public getTotalInventory(): number {
    return this.totalInventory;
  }

  public isVisible(): boolean {
    return this.visible;
  }

  public isDeleted(): boolean {
    return this.deleted;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public setSku(value: string | null) {
    this.sku = value;
  }

  public setName(value: string) {
    this.name = value;
  }

  public setType(value: ProductType) {
    this.type = value;
  }

  public setDescription(value: string | null) {
    this.description = value;
  }

  public setPrice(value: number) {
    this.price = value;
  }

  public setSalesPrice(value: number) {
    this.salesPrice = value;
  }

  public setTrackInventory(value: boolean) {
    this.trackInventory = value;
  }

  public setTotalInventory(value: number) {
    this.totalInventory = value;
  }

  public setVisibility(value: boolean) {
    this.visible = value;
  }

  public setDeleted(value: boolean) {
    this.deleted = value;
  }
}
