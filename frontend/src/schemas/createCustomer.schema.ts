import { z } from "zod";

const createCustomerSchema = z.object({
  name: z.string().nonempty("El nombre es requerido"),
  phone: z.string().nonempty("El teléfono es requerido"),
  email: z.string().email("Debe ser un email válido").or(z.literal("")),
  birthDate: z.string().optional(),
  notes: z.string().optional(),
});

export type CreateCustomerSchema = z.infer<typeof createCustomerSchema>;

export default createCustomerSchema;
