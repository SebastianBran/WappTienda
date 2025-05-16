import { OrderStatus, PaymentStatus } from "@/types/orders";
import { z } from "zod";

const updateOrderSchema = z.object({
  status: z.nativeEnum(OrderStatus).optional(),
  paymentStatus: z.nativeEnum(PaymentStatus).optional(),
  internalNotes: z.string().nullable(),
});

export type UpdateOrderSchema = z.infer<typeof updateOrderSchema>;

export default updateOrderSchema;
