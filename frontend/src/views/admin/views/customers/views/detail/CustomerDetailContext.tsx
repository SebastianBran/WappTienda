import { Customer } from "@/types/customers";
import { createContext } from "react";

export type CustomerDetailContextValue = {
  customer: Customer;
};

const CustomerDetailContext = createContext<CustomerDetailContextValue>(
  {} as CustomerDetailContextValue,
);

export default CustomerDetailContext;
