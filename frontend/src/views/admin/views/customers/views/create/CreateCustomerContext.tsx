import { createContext } from "react";

export type CreateCustomerContextValue = object;

const CreateCustomerContext = createContext<CreateCustomerContextValue>({});

export default CreateCustomerContext;
