import { ProductType } from "@/types/products";
import { z } from "zod";

const updateProductSchema = z
  .object({
    name: z.string().nonempty(),
    sku: z.string().optional(),
    visible: z.boolean().optional(),
    type: z.nativeEnum(ProductType),
    description: z.string().optional(),
    trackInventory: z.boolean(),
    totalInventory: z.number().int().optional(),
    salesPrice: z.number().positive().optional(),
    price: z.number().positive(),
  })
  .refine(
    ({ trackInventory, totalInventory }) => {
      if (trackInventory && (!totalInventory || totalInventory < 0)) {
        return false;
      }

      return true;
    },
    {
      message: "El inventario total es requerido",
      path: ["totalInventory"],
    },
  );

export type UpdateProductSchema = z.infer<typeof updateProductSchema>;

export default updateProductSchema;
