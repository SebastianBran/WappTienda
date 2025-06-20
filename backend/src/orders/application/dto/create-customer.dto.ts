export class CreateCustomerDto {
  constructor(
    public name: string,
    public phone: string,
    public email: string | null,
    public birthDate: Date | null,
    public notes: string | null,
  ) {}
}
