import useGetOrderByIdQuery from "@/api/queries/useGetOrderByIdQuery";
import updateOrderSchema, {
  UpdateOrderSchema,
} from "@/schemas/updateOrder.schema";
import { OrderStatus, PaymentStatus } from "@/types/orders";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, PropsWithChildren, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  OrderDetailContext,
  OrderDetailContextValue,
} from "./OrderDetailContext";

export const OrderDetailWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { orderId } = useParams();
  const { data: order, isPending } = useGetOrderByIdQuery(Number(orderId || 0));
  const form = useForm<UpdateOrderSchema>({
    defaultValues: {
      status: order?.status || OrderStatus.PENDING,
      paymentStatus: order?.paymentStatus || PaymentStatus.PENDING,
      internalNotes: order?.internalNotes || "",
    },
    resolver: zodResolver(updateOrderSchema),
  });

  useEffect(() => {
    if (order) {
      form.reset({
        status: order.status,
        paymentStatus: order.paymentStatus,
        internalNotes: order.internalNotes,
      });
    }
  }, [order, form]);

  const value: OrderDetailContextValue = {
    order: order,
    isPending: isPending,
  };

  return (
    <OrderDetailContext.Provider value={value}>
      <FormProvider {...form}>{children}</FormProvider>
    </OrderDetailContext.Provider>
  );
};
