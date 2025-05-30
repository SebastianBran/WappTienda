import { Card, CardContent } from "@/components/ui/card";
import { FC, useContext } from "react";
import CustomerDetailContext from "../CustomerDetailContext";
import useCustomerStats from "@/hooks/useCustomerStats";

const CustomerOrderStatistics: FC = () => {
  const { customer } = useContext(CustomerDetailContext);
  const { totalSpent, totalOrders, averageSpent } = useCustomerStats(customer);

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Pedidos</p>
            <p className="text-2xl font-bold">{totalOrders}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              Valor promedio del pedido
            </p>
            <p className="text-2xl font-bold">S/ {averageSpent}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total gastado</p>
            <p className="text-2xl font-bold">S/ {totalSpent}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerOrderStatistics;
