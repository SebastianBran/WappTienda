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
import { ProductType } from "@/types/products";

export const ProductDetailWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { productId } = useParams();
  const { data: product, isPending } = useGetProductByIdQuery(
    Number(productId || 0),
  );
  const form = useForm<UpdateProductSchema>({
    defaultValues: {
      name: "",
      sku: "",
      visible: false,
      type: ProductType.VIRTUAL,
      description: "",
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
      reset({
        name: product.name,
        sku: product.sku || "",
        visible: product.visible,
        type: product.type,
        description: product.description || "",
        trackInventory: product.trackInventory,
        totalInventory: product.totalInventory || 0,
        salesPrice: product.salesPrice,
        price: product.price,
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
