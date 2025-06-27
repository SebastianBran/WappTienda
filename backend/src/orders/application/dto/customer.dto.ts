export class CustomerDto {
  constructor(
    public id: number,
    public name: string,
    public email: string | null,
    public phone: string,
    public birthDate: Date | null,
    public notes: string | null,
    public deleted: boolean,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

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
