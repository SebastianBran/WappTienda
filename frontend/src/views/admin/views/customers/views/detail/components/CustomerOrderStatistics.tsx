import { Card, CardContent } from "@/components/ui/card";
import { FC, useContext } from "react";
import CustomerDetailContext from "../CustomerDetailContext";

const CustomerOrderStatistics: FC = () => {
  const { customer } = useContext(CustomerDetailContext);
  const totalSpent = Number(
    customer.orders
      .reduce((acc, order) => {
        return acc + order.totalAmount;
      }, 0)
      .toFixed(2),
  );
  let averageSpent: string = "0.00";
  const ordersLength = customer.orders.length;
  if (ordersLength > 0) {
    averageSpent = Number(totalSpent / ordersLength).toFixed(2);
  }

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Pedidos</p>
            <p className="text-2xl font-bold">{ordersLength}</p>
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
