import DeleteElementDialog from "@/components/common/DeleteElementDialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CustomerDetailContext from "../CustomerDetailContext";
import useDeleteCustomerMutation from "@/api/mutations/useDeleteCustomerMutation";

const CustomerDetailHeader: FC = () => {
  const navigate = useNavigate();
  const { customer } = useContext(CustomerDetailContext);
  const { mutate: deleteCustomerMutation } = useDeleteCustomerMutation();

  const lastOrderDate = () => {
    let lastOrder = customer.orders[0];
    for (let i = 1; i < customer.orders.length; i++) {
      if (
        new Date(customer.orders[i].created_at) > new Date(lastOrder.created_at)
      ) {
        lastOrder = customer.orders[i];
      }
    }

    return new Date(lastOrder.created_at).toLocaleDateString("es-ES");
  };

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
              Último pedido {lastOrderDate()}
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
