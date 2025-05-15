import { FC, PropsWithChildren } from "react";
import CreateOrderContext, {
  CreateOrderContextValue,
} from "./CreateOrderContext";
import { FormProvider, useForm } from "react-hook-form";
import createOrderSchema, {
  CreateOrderSchema,
} from "@/schemas/createOrder.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateOrderWrapper: FC<PropsWithChildren> = ({ children }) => {
  const form = useForm<CreateOrderSchema>({
    defaultValues: {
      customer: {
        name: "",
        phone: "",
      },
      orderItems: [],
    },
    resolver: zodResolver(createOrderSchema),
  });

  const value: CreateOrderContextValue = {};

  return (
    <CreateOrderContext.Provider value={value}>
      <FormProvider {...form}>{children}</FormProvider>
    </CreateOrderContext.Provider>
  );
};

export default CreateOrderWrapper;
