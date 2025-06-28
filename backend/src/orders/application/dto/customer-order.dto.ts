export class CustomerOrderDto {
  constructor(
    private id: number,
    private name: string,
    private email: string | null,
    private phone: string,
    private birthDate: Date | null,
    private notes: string | null,
    private deleted: boolean,
    private createdAt: Date,
    private updatedAt: Date,
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

  public update(
    name?: string,
    email?: string | null,
    phone?: string,
    birthDate?: Date | null,
    notes?: string | null,
  ): void {
    if (name !== undefined) {
      this.name = name;
    }

    if (email !== undefined) {
      this.email = email;
    }

    if (phone !== undefined) {
      this.phone = phone;
    }

    if (birthDate !== undefined) {
      this.birthDate = birthDate;
    }

    if (notes !== undefined) {
      this.notes = notes;
    }
  }
}
