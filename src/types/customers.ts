export interface Customer {
  id: number;
  name: string;
  email: string | null;
  phone: string;
  birthDate: string | null;
  notes: string | null;
  deleted: boolean;
  created_at: string;
  updated_at: string;
}
