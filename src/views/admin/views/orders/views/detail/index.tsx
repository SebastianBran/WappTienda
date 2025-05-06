import { ArrowLeft, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate, useParams } from "react-router-dom";
import useGetOrderByIdQuery from "@/api/queries/useGetOrderByIdQuery";
import { orderStatus, paymentStatus } from "@/lib/constants";
import useUpdateOrderMutation from "@/api/mutations/useUpdateOrderMutation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import updateOrderSchema, {
  UpdateOrderFormType,
} from "@/schemas/updateOrder.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useEffect } from "react";
import Spinner from "@/components/common/Spinner";
import ViewLoading from "@/components/common/ViewLoading";

const OrderDetail = () => {
  const { orderId } = useParams();
  const { data: order, isPending: getOrderLoading } = useGetOrderByIdQuery(Number(orderId || 0));
  const { mutate, isPending: updateOrderLoading } = useUpdateOrderMutation();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      status: order?.status,
      paymentStatus: order?.paymentStatus,
      internalNotes: order?.internalNotes,
    },
    resolver: zodResolver(updateOrderSchema),
  });

  useEffect(() => {
    if (order) {
      form.reset(order);
    }
  }, [order, form]);

  const onSubmit = (data: UpdateOrderFormType) => {
    const orderId = order?.id;
    if (orderId) {
      mutate({ id: order?.id, data });
    }
  };

  if (getOrderLoading) {
    return <ViewLoading />;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/admin/orders")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-semibold">
              #{order?.id} {order?.customer.name}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Eliminar</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            {/* Status Section */}
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
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona el estado de la orden" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {orderStatus.map((status) => (
                                      <SelectItem
                                        key={status.value}
                                        value={status.value}
                                      >
                                        {status.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
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
                              <FormLabel>Estado del Pago</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona el estado del pago" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {paymentStatus.map((status) => (
                                      <SelectItem
                                        key={status.value}
                                        value={status.value}
                                      >
                                        {status.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
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
                                defaultValue={field.value}
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

            {/* Order Items */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Artículos</h3>
                    <p className="text-sm text-muted-foreground">
                      {order?.totalItems}{" "}
                      {order?.totalItems && order.totalItems > 1
                        ? "artículos"
                        : "artículo"}
                    </p>
                  </div>
                  {order?.orderItems.map((item) => (
                    <div
                      className="flex flex-col"
                      key={item.id + item.product.name}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <span>{item.quantity}x</span>
                          <span>{item.product.name}</span>
                        </div>
                        <span>S/ {item.price * item.quantity}</span>
                      </div>
                    </div>
                  ))}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>S/ {order?.subtotalAmount}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>S/ {order?.totalAmount}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Cliente</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        navigate(
                          `/admin/customers/${order?.customer.id}/detail`,
                        )
                      }
                    >
                      Ver
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-sm text-muted-foreground">
                        Nombre
                      </span>
                      <span className="col-span-2">{order?.customer.name}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-sm text-muted-foreground">
                        Teléfono
                      </span>
                      <span className="col-span-2">
                        {order?.customer.phone}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
