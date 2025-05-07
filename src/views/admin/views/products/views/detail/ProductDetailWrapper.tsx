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
      name: product?.name || "",
      sku: product?.sku || "",
      visible: product?.visible || false,
      type: product?.type || ProductType.VIRTUAL,
      description: product?.description || "",
      trackInventory: product?.trackInventory || false,
      totalInventory: product?.totalInventory || 0,
      salesPrice: product?.salesPrice || 0,
      price: product?.price || 0,
    },
    resolver: zodResolver(updateProductSchema),
  });

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        sku: product.sku,
        visible: product.visible,
        type: product.type,
        description: product.description,
        trackInventory: product.trackInventory,
        totalInventory: product.totalInventory,
        salesPrice: product.salesPrice,
        price: product.price,
      });
    }
  }, [product, form]);

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
