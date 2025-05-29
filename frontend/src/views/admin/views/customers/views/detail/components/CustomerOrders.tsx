import { FC, useContext } from "react";
import CustomerDetailContext from "../CustomerDetailContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { OrderStatus, PaymentStatus } from "@/types/orders";
import { Badge } from "@/components/ui/badge";

const CustomerOrders: FC = () => {
  const navigate = useNavigate();
  const { customer } = useContext(CustomerDetailContext);

  const parseOrderStatus = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return "Pendiente";
      case OrderStatus.CANCELLED:
        return "Cancelado";
      case OrderStatus.CONFIRMED:
        return "Completado";
      case OrderStatus.DELIVERED:
        return "Entregado";
      default:
        return "Desconocido";
    }
  };

  const parsePaymentStatus = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.PENDING:
        return "Pendiente";
      case PaymentStatus.PAID:
        return "Pagado";
      case PaymentStatus.REFUNDED:
        return "Reembolsado";
      case PaymentStatus.PARTIALLY_REFUNDED:
        return "Reembolsado parcialmente";
      case PaymentStatus.FAILED:
        return "Fallido";
      case PaymentStatus.CANCELED:
        return "Cancelado";
      default:
        return "Desconocido";
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Últimos pedidos</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Orden</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Pago</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customer.orders?.map((order) => (
            <TableRow
              onClick={() => navigate(`/admin/orders/${order.id}/detail`)}
              key={order.id + customer.name}
            >
              <TableCell>
                <div className="font-medium">#{order.id}</div>
              </TableCell>
              <TableCell>
                <div className="text-sm text-muted-foreground">
                  {new Date(order.created_at).toLocaleDateString("es-ES")}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Badge variant="secondary">
                    {parseOrderStatus(order.status)}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Badge variant="secondary">
                    {parsePaymentStatus(order.paymentStatus)}
                  </Badge>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomerOrders;
