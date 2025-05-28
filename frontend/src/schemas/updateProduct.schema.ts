import { ProductType } from '@/types/products';
import { z } from 'zod';

const updateProductSchema = z.object({
  name: z.string().nonempty(),
  sku: z.string().optional(),
  visible: z.boolean().optional(),
  type: z.nativeEnum(ProductType),
  description: z.string().optional(),
  trackInventory: z.boolean(),
  totalInventory: z.number().int().positive().optional(),
  salesPrice: z.number().positive().optional(),
  price: z.number().positive(),
});

export type UpdateProductSchema = z.infer<typeof updateProductSchema>;

export default updateProductSchema;
