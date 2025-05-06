import useGetProductByIdQuery from "@/api/queries/useGetProductByIdQuery";
import { FC, PropsWithChildren } from "react";
import { useParams } from "react-router-dom";
import { ProductDetailContext, ProductDetailContextValue } from "./ProductDetailContext";

export const ProductDetailWrapper: FC<PropsWithChildren> = ({
  children,
}) => {
  const { productId } = useParams();
  const { data: product, isPending } = useGetProductByIdQuery(
    Number(productId || 0),
  );

  const value: ProductDetailContextValue = {
    product: product,
    isPending: isPending,
  }

  return (
    <ProductDetailContext.Provider value={value}>
      {children}
    </ProductDetailContext.Provider>
  );
};
