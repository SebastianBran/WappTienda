import { FC, PropsWithChildren, useEffect } from "react";
import EditCustomerContext, {
  EditCustomerContextValue,
} from "./EditCustomerContext";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import updateCustomerSchema, {
  UpdateCustomerSchema,
} from "@/schemas/updateCustomer.schema";
import useGetCustomerByIdQuery from "@/api/queries/useGetCustomerByIdQuery";
import { useParams } from "react-router-dom";

const EditCustomerWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { customerId } = useParams();
  const { data: customer, isPending } = useGetCustomerByIdQuery(
    Number(customerId || 0),
  );
  const form = useForm<UpdateCustomerSchema>({
    defaultValues: {
      name: "",
      phone: "",
      email: undefined,
      birthDate: undefined,
      notes: undefined,
    },
    resolver: zodResolver(updateCustomerSchema),
  });
  const { reset } = form;

  useEffect(() => {
    if (customer) {
      const { name, phone, email, birthDate, notes } = customer;

      reset({
        name: name || undefined,
        phone: phone || undefined,
        email: email || undefined,
        birthDate: birthDate || undefined,
        notes: notes || undefined,
      });
    }
  }, [customer, reset]);

  const value: EditCustomerContextValue = {
    customer,
    isPending,
  };

  return (
    <EditCustomerContext.Provider value={value}>
      <FormProvider {...form}>{children}</FormProvider>
    </EditCustomerContext.Provider>
  );
};

export default EditCustomerWrapper;
