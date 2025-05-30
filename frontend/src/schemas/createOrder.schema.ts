import { z } from "zod";

const createOrderSchema = z.object({
  customer: z.object({
    name: z.string().nonempty("El nombre del cliente es requerido"),
    phone: z.string().nonempty("El teléfono del cliente es requerido"),
  }),
  orderItems: z
    .array(
      z.object({
        productId: z.number().int().positive(),
        productName: z.string().nonempty(),
        price: z
          .number({ message: "Se espera un valor numérico" })
          .positive("El precio debe ser mayor a 0"),
        quantity: z
          .number({ message: "Se espera un valor numérico" })
          .int("El valor debe ser un número entero sin decimales")
          .positive("La cantidad debe ser mayor a 0"),
      }),
    )
    .nonempty(),
});

export type CreateOrderSchema = z.infer<typeof createOrderSchema>;

export default createOrderSchema;
