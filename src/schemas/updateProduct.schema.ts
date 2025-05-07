import { ProductType } from '@/types/products';
import { z } from 'zod';

const updateProductSchema = z.object({
  name: z.string().nonempty(),
  sku: z.string().nonempty(),
  visible: z.boolean().optional(),
  type: z.nativeEnum(ProductType).optional(),
  description: z.string().optional(),
  trackInventory: z.boolean().optional(),
  totalInventory: z.number().int().positive().optional(),
  salesPrice: z.number().positive().optional(),
  price: z.number().positive().optional(),
});

export type UpdateProductSchema = z.infer<typeof updateProductSchema>;

export default updateProductSchema;
