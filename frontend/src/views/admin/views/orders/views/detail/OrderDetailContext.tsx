import { Order } from "@/types/orders";
import { createContext } from "react";

export interface OrderDetailContextValue {
  order: Order;
};

export const OrderDetailContext = createContext<OrderDetailContextValue>(
  {} as OrderDetailContextValue,
);
