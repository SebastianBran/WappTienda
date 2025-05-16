import { ArrowLeft, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import ViewLoading from "@/components/common/ViewLoading";
import DeleteElementDialog from "@/components/common/DeleteElementDialog";
import useDeleteOrderMutation from "@/api/mutations/useDeleteOrderMutation";
import { OrderSummary, UpdateOrderForm, CustomerCard } from "./components";
import { useContext } from "react";
import { OrderDetailContext } from "./OrderDetailContext";
import useUpdateOrderMutation from "@/api/mutations/useUpdateOrderMutation";
import { UpdateOrderSchema } from "@/schemas/updateOrder.schema";
import { useFormContext } from "react-hook-form";
import SaveChangesToolbar from "@/components/common/SaveChangesToolbar";
import { cn } from "@/lib/utils";

const OrderDetail = () => {
  const navigate = useNavigate();
  const { order, isPending } = useContext(OrderDetailContext);
  const { mutate: updateOrderMutate } = useUpdateOrderMutation();
  const { mutate: deleteOrderMutate } = useDeleteOrderMutation();
  const form = useFormContext<UpdateOrderSchema>();
  const isFormChanged = form.formState.isDirty;

  if (isPending || !order) {
    return <ViewLoading />;
  }

  const onSubmit = (data: UpdateOrderSchema) => {
    updateOrderMutate(
      { id: order.id, data },
      {
        onSuccess: () => {
          form.reset(data);
        },
      },
    );
  };

  const handleDelete = () => {
    deleteOrderMutate(
      { id: order.id },
      {
        onSuccess: () => {
          navigate("/admin/orders");
        },
      },
    );
  };

  return (
    <>
      {isFormChanged && <SaveChangesToolbar form={form} onSubmit={onSubmit} />}
      <div className={cn("container mx-auto py-6", isFormChanged && "pt-16")}>
        <div className="flex flex-col gap-6">
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
                #{order.id} {order.customer.name}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DeleteElementDialog
                    title="Eliminar orden"
                    description="¿Estás seguro de que deseas eliminar esta orden?"
                    trigger={
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        Eliminar
                      </DropdownMenuItem>
                    }
                    onDelete={handleDelete}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <form
            className="grid gap-6 md:grid-cols-3"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="md:col-span-2 space-y-6">
              <UpdateOrderForm />
              <OrderSummary order={order} />
            </div>

            <div className="flex flex-col space-y-6">
              <CustomerCard customer={order.customer} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
