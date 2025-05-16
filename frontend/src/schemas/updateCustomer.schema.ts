import { z } from 'zod';

const updateCustomerSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  birthDate: z.string().optional(),
  notes: z.string().optional(),
});

export type UpdateCustomerSchema = z.infer<typeof updateCustomerSchema>;

export default updateCustomerSchema;
