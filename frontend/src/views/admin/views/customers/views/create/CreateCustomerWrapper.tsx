import { FC, PropsWithChildren } from "react";
import CreateCustomerContext, {
  CreateCustomerContextValue,
} from "./CreateCustomerContext";
import { FormProvider, useForm } from "react-hook-form";
import createCustomerSchema, {
  CreateCustomerSchema,
} from "@/schemas/createCustomer.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateCustomerWrapper: FC<PropsWithChildren> = ({ children }) => {
  const form = useForm<CreateCustomerSchema>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      birthDate: "",
      notes: "",
    },
    resolver: zodResolver(createCustomerSchema),
  });

  const value: CreateCustomerContextValue = {};

  return (
    <CreateCustomerContext.Provider value={value}>
      <FormProvider {...form}>{children}</FormProvider>
    </CreateCustomerContext.Provider>
  );
};

export default CreateCustomerWrapper;
