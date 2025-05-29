import DeleteElementDialog from "@/components/common/DeleteElementDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowLeft, MoreHorizontal } from "lucide-react";
import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { OrderDetailContext } from "../OrderDetailContext";
import useDeleteOrderMutation from "@/api/mutations/useDeleteOrderMutation";

const OrderDetailHeader: FC = () => {
  const navigate = useNavigate();
  const { order } = useContext(OrderDetailContext);
  const { mutate: deleteOrderMutate } = useDeleteOrderMutation();

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
  );
};

export default OrderDetailHeader;
