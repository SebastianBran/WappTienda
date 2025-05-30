import { ProductType } from "@/types/products";
import { z } from "zod";

const updateProductSchema = z
  .object({
    name: z.string().nonempty("El nombre del producto es requerido"),
    sku: z.string().optional(),
    visible: z.boolean().optional(),
    type: z.nativeEnum(ProductType),
    description: z.string().optional(),
    trackInventory: z.boolean(),
    totalInventory: z
      .number({ message: "El inventario total debe ser un valor numérico" })
      .int("El inventario total debe ser un valor entero")
      .positive("El inventario total debe ser mayor a 0")
      .optional(),
    salesPrice: z
      .number({ message: "El precio de venta debe ser un valor numérico" })
      .positive("El precio de venta debe ser mayor a 0")
      .optional(),
    price: z
      .number({ message: "El precio debe ser un valor numérico" })
      .positive("El precio debe ser mayor a 0"),
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
