import { createContext } from "react";

export type CreateProductContextValue = object

const CreateProductContext = createContext<CreateProductContextValue>(
  {} as CreateProductContextValue,
);

export default CreateProductContext;
