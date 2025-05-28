import { z } from 'zod';

const createCustomerSchema = z.object({
  name: z.string().nonempty(),
  phone: z.string().nonempty(),
  email: z.string().email().optional(),
  birthDate: z.string().optional(),
  notes: z.string().optional(),
});

export type CreateCustomerSchema = z.infer<typeof createCustomerSchema>;

export default createCustomerSchema;
