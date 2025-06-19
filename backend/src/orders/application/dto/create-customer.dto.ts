export interface CreateCustomerDto {
  name: string;
  phone: string;
  email: string | null;
  birthDate: Date | null;
  notes: string | null;
}
