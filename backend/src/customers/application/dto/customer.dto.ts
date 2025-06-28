export class CustomerDto {
  constructor(
    private id: number,
    private name: string,
    private email: string | null,
    private phone: string,
    private birthDate: Date | null,
    private notes: string | null,
    private deleted: boolean = false,
    private createdAt: Date = new Date(),
    private updatedAt: Date = new Date(),
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

  public isDeleted(): boolean {
    return this.deleted;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
