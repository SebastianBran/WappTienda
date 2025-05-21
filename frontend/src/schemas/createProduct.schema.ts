import { ProductType } from '@/types/products';
import { z } from 'zod';

const createProductSchema = z.object({
  name: z.string().nonempty(),
  sku: z.string().optional(),
  visible: z.boolean(),
  type: z.nativeEnum(ProductType),
  description: z.string().optional(),
  trackInventory: z.boolean(),
  totalInventory: z.number().int().optional(),
  salesPrice: z.number().optional(),
  price: z.number().positive(),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;

export default createProductSchema;
