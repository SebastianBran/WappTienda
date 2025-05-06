import { OrderStatus, PaymentStatus } from "@/types/orders";
import { z } from "zod";

const updateOrderSchema = z.object({
  status: z.nativeEnum(OrderStatus).optional(),
  paymentStatus: z.nativeEnum(PaymentStatus).optional(),
  internalNotes: z.string().optional(),
});

export type UpdateOrderFormType = z.infer<typeof updateOrderSchema>;

export default updateOrderSchema;
