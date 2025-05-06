export interface Product {
  id: number;
  sku: string;
  name: string;
  type: string;
  description: string;
  price: number;
  salesPrice: number;
  trackInventory: boolean;
  totalInventory: number;
  visible: boolean;
  deleted: boolean;
  created_at: string;
  updated_at: string;
}
