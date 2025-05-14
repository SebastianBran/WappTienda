import { z } from "zod";

const createOrderSchema = z.object({
  customer: z.object({
    name: z.string().nonempty(),
    phone: z.string().nonempty(),
  }),
  orderItems: z
    .array(
      z.object({
        productId: z.number().int().positive(),
        price: z.number().positive(),
        quantity: z.number().int().positive(),
      }),
    )
    .nonempty(),
});

export type CreateOrderSchema = z.infer<typeof createOrderSchema>;

export default createOrderSchema;
