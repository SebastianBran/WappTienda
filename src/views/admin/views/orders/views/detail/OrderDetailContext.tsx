import { Order } from "@/types/orders";
import { createContext } from "react";

export interface OrderDetailContextValue {
  order?: Order;
  isPending: boolean;
};

export const OrderDetailContext = createContext<OrderDetailContextValue>(
  {} as OrderDetailContextValue,
);
