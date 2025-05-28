import useGetProductByIdQuery from "@/api/queries/useGetProductByIdQuery";
import { FC, PropsWithChildren, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  ProductDetailContext,
  ProductDetailContextValue,
} from "./ProductDetailContext";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import updateProductSchema, {
  UpdateProductSchema,
} from "@/schemas/updateProduct.schema";

export const ProductDetailWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { productId } = useParams();
  const { data: product, isPending } = useGetProductByIdQuery(
    Number(productId || 0),
  );
  const form = useForm<UpdateProductSchema>({
    defaultValues: {
      name: "",
      sku: undefined,
      visible: false,
      type: undefined,
      description: undefined,
      trackInventory: false,
      totalInventory: 0,
      salesPrice: 0,
      price: 0,
    },
    resolver: zodResolver(updateProductSchema),
  });
  const { reset } = form;

  useEffect(() => {
    if (product) {
      const {
        name,
        sku,
        visible,
        type,
        description,
        trackInventory,
        totalInventory,
        salesPrice,
        price,
      } = product;

      reset({
        name: name,
        sku: sku || undefined,
        visible: visible,
        type: type,
        description: description || undefined,
        trackInventory: trackInventory,
        totalInventory: totalInventory || 0,
        salesPrice: salesPrice,
        price: price,
      });
    }
  }, [product, reset]);

  const value: ProductDetailContextValue = {
    product: product,
    isPending: isPending,
  };

  return (
    <ProductDetailContext.Provider value={value}>
      <FormProvider {...form}>{children}</FormProvider>
    </ProductDetailContext.Provider>
  );
};
