import { z } from "zod";

const updateCustomerSchema = z.object({
  name: z.string().nonempty("El nombre es requerido"),
  phone: z.string().nonempty("El teléfono es requerido"),
  email: z
    .string()
    .email("Debe ser un email válido")
    .or(z.literal("")),
  birthDate: z.string().optional(),
  notes: z.string().optional(),
});

export type UpdateCustomerSchema = z.infer<typeof updateCustomerSchema>;

export default updateCustomerSchema;
