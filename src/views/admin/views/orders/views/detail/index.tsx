import { ArrowLeft, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate, useParams } from "react-router-dom";
import useGetOrderByIdQuery from "@/api/queries/useGetOrderByIdQuery";
import ViewLoading from "@/components/common/ViewLoading";
import DeleteElementDialog from "@/components/common/DeleteElementDialog";
import useDeleteOrderMutation from "@/api/mutations/useDeleteOrderMutation";
import { OrderSummary, UpdateOrderForm, CustomerCard } from "./components";

const OrderDetail = () => {
  const { orderId } = useParams();
  const { data: order, isPending: getOrderLoading } = useGetOrderByIdQuery(
    Number(orderId || 0),
  );
  const navigate = useNavigate();
  const { mutate } = useDeleteOrderMutation();

  if (getOrderLoading || !order) {
    return <ViewLoading />;
  }

  const handleDelete = () => {
    mutate({ id: order.id });
  };

  return (
    <div className="container mx-auto py-6">
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

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <UpdateOrderForm order={order} />
            <OrderSummary order={order} />
          </div>

          <div className="flex flex-col space-y-6">
            <CustomerCard customer={order.customer} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
