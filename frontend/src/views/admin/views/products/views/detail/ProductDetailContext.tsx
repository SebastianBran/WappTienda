import { Product } from "@/types/products";
import { createContext } from "react";

export interface ProductDetailContextValue {
  product: Product;
}

export const ProductDetailContext = createContext<ProductDetailContextValue>(
  {} as ProductDetailContextValue,
);
