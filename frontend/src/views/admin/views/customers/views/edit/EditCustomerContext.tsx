import { Customer } from "@/types/customers";
import { createContext } from "react";

export type EditCustomerContextValue = {
  customer?: Customer;
  isPending: boolean;
};

const EditCustomerContext = createContext<EditCustomerContextValue>(
  {} as EditCustomerContextValue,
);

export default EditCustomerContext;
