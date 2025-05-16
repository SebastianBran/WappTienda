import { createContext } from "react";

export type CreateOrderContextValue = object;

const CreateOrderContext = createContext<CreateOrderContextValue>(
  {} as CreateOrderContextValue,
);

export default CreateOrderContext;
