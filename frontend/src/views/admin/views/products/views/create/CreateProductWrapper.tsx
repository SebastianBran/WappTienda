import { FC, PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CreateProductContext, {
  CreateProductContextValue,
} from "./CreateProductContext";
import createProductSchema, {
  CreateProductSchema,
} from "@/schemas/createProduct.schema";
import { ProductType } from "@/types/products";

const CreateProductWrapper: FC<PropsWithChildren> = ({ children }) => {
  const form = useForm<CreateProductSchema>({
    defaultValues: {
      name: "",
      sku: "",
      visible: true,
      type: ProductType.PHYSICAL,
      description: "",
      trackInventory: false,
      totalInventory: 0,
      salesPrice: 0,
      price: 0,
    },
    resolver: zodResolver(createProductSchema),
  });

  const value: CreateProductContextValue = {};

  return (
    <CreateProductContext.Provider value={value}>
      <FormProvider {...form}>{children}</FormProvider>
    </CreateProductContext.Provider>
  );
};

export default CreateProductWrapper;
