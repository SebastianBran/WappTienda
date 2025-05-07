import useUpdateOrderMutation from "@/api/mutations/useUpdateOrderMutation";
import Spinner from "@/components/common/Spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { orderStatus, paymentStatus } from "@/lib/constants";
import updateOrderSchema, {
  UpdateOrderFormType,
} from "@/schemas/updateOrder.schema";
import { Order, OrderStatus } from "@/types/orders";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";

interface UpdateOrderFormProps {
  order: Order;
}

const UpdateOrderForm: FC<UpdateOrderFormProps> = ({ order }) => {
  const { mutate, isPending: updateOrderLoading } = useUpdateOrderMutation();

  const form = useForm({
    defaultValues: {
      status: order.status || OrderStatus.PENDING,
      paymentStatus: order.paymentStatus || OrderStatus.PENDING,
      internalNotes: order.internalNotes || "",
    },
    resolver: zodResolver(updateOrderSchema),
  });

  useEffect(() => {
    if (order) {
      form.reset(order);
    }
  }, [order, form]);

  const onSubmit = (data: UpdateOrderFormType) => {
    mutate({ id: order.id, data });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        name={field.name}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              ref={field.ref}
                              onBlur={field.onBlur}
                              placeholder="Selecciona el estado de la orden"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {orderStatus.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="paymentStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado del pago</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        name={field.name}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              ref={field.ref}
                              onBlur={field.onBlur}
                              placeholder="Selecciona el estado del pago"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {paymentStatus.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="internalNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notas Internas</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Añadir una nota (invisible para los clientes)"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled={updateOrderLoading}>
              {updateOrderLoading && <Spinner />}
              Guardar Cambios
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default UpdateOrderForm;
