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
import ViewLoading from "@/components/common/ViewLoading";

const EditCustomerWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { customerId } = useParams();
  const { data: customer, isPending } = useGetCustomerByIdQuery(
    Number(customerId || 0),
  );
  const form = useForm<UpdateCustomerSchema>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      birthDate: "",
      notes: "",
    },
    resolver: zodResolver(updateCustomerSchema),
  });
  const { reset } = form;

  useEffect(() => {
    if (customer) {
      reset({
        name: customer.name,
        phone: customer.phone,
        email: customer.email || "",
        birthDate: customer.birthDate || "",
        notes: customer.notes || "",
      });
    }
  }, [customer, reset]);

  if (isPending || !customer) {
    return <ViewLoading />;
  }

  const value: EditCustomerContextValue = {
    customer,
  };

  return (
    <EditCustomerContext.Provider value={value}>
      <FormProvider {...form}>{children}</FormProvider>
    </EditCustomerContext.Provider>
  );
};

export default EditCustomerWrapper;
