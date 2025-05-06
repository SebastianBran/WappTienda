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
import CustomerdCard from "./components/CustomerdCard";
import UpdateOrderForm from "./components/UpdateOrderForm";
import OrderSummary from "./components/OrderSummary";

const OrderDetail = () => {
  const { orderId } = useParams();
  const { data: order, isPending: getOrderLoading } = useGetOrderByIdQuery(
    Number(orderId || 0),
  );
  const navigate = useNavigate();

  if (getOrderLoading) {
    return <ViewLoading />;
  }

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
            <UpdateOrderForm order={order} />
            <OrderSummary order={order} />
          </div>

          <div className="flex flex-col space-y-6">
            <CustomerdCard customer={order?.customer} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
