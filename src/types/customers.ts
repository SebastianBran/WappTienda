import { Order } from "./orders";

export interface Customer {
  id: number;
  name: string;
  email?: string;
  phone: string;
  birthDate?: string;
  notes?: string;
  deleted: boolean;
  created_at: string;
  updated_at: string;
  orders: Order[];
}
