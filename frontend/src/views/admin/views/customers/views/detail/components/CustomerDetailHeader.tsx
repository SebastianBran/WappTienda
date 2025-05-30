import DeleteElementDialog from "@/components/common/DeleteElementDialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CustomerDetailContext from "../CustomerDetailContext";
import useDeleteCustomerMutation from "@/api/mutations/useDeleteCustomerMutation";
import useCustomerStats from "@/hooks/useCustomerStats";

const CustomerDetailHeader: FC = () => {
  const navigate = useNavigate();
  const { customer } = useContext(CustomerDetailContext);
  const { mutate: deleteCustomerMutation } = useDeleteCustomerMutation();
  const { lastOrder } = useCustomerStats(customer);

  const handleDelete = () => {
    deleteCustomerMutation(
      {
        id: customer.id,
      },
      {
        onSuccess: () => {
          navigate("/admin/customers");
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
          onClick={() => navigate("/admin/customers")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="space-y-1">
          <h1 className="text-xl font-semibold">{customer.name}</h1>
          {customer.orders.length > 0 && (
            <p className="text-sm text-muted-foreground">
              Último pedido {lastOrder}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <DeleteElementDialog
          title="Eliminar cliente"
          description="¿Estás seguro de que deseas eliminar este cliente?"
          trigger={<Button variant="destructive">Eliminar</Button>}
          onDelete={handleDelete}
        ></DeleteElementDialog>
      </div>
    </div>
  );
};

export default CustomerDetailHeader;
