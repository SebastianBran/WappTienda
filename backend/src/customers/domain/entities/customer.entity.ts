import { Order } from './order.entity';

export class Customer {
  constructor(
    public id: number,
    public name: string,
    public email: string | null,
    public phone: string,
    public birthDate: Date | null,
    public notes: string | null,
    public orders: Order[] = [],
    public deleted: boolean = false,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string | null {
    return this.email;
  }

  public getPhone(): string {
    return this.phone;
  }

  public getBirthDate(): Date | null {
    return this.birthDate;
  }

  public getNotes(): string | null {
    return this.notes;
  }

  public getOrders(): Order[] {
    return this.orders;
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

  public setName(name: string): void {
    this.name = name;
  }

  public setEmail(email: string | null): void {
    this.email = email;
  }

  public setPhone(phone: string): void {
    this.phone = phone;
  }

  public setBirthDate(birthDate: Date | null): void {
    this.birthDate = birthDate;
  }

  public setNotes(notes: string | null): void {
    this.notes = notes;
  }

  public setOrders(orders: Order[]): void {
    this.orders = orders;
  }

  public setDeleted(deleted: boolean): void {
    this.deleted = deleted;
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }
}
