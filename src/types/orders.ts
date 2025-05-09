import { Customer } from "./customers";
import { Product } from "./products";

export interface Order {
  id: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  subtotalAmount: number;
  internalNotes: string | null;
  orderItems: OrderItem[];
  totalItems: number;
  customer: Customer;
  created_at: string;
  updated_at: string;
}

export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  DELIVERED = "DELIVERED",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  REFUNDED = "REFUNDED",
  PARTIALLY_REFUNDED = "PARTIALLY_REFUNDED",
  FAILED = "FAILED",
  CANCELED = "CANCELED",
}

export interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  product: Product;
  created_at: string;
  updated_at: string;
}
