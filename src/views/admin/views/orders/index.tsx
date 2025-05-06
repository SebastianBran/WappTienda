import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "@/components/ui/sidebar";
import { useEffect } from "react";
import useGetAllOrdersQuery from "@/api/queries/useGetAllOrdersQuery";
import { OrderStatus, PaymentStatus } from "@/types/orders";
import ViewLoading from "@/components/common/ViewLoading";

const Orders = () => {
  const navigate = useNavigate();
  const { setOpen } = useSidebar();
  const { data, isPending } = useGetAllOrdersQuery();

  useEffect(() => {
    setOpen(true);
  }, [setOpen]);

  const parseOrderStatus = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return "Pendiente";
      case OrderStatus.CANCELLED:
        return "Cancelada";
      case OrderStatus.CONFIRMED:
        return "Completada";
      case OrderStatus.DELIVERED:
        return "Entregada";
      default:
        return "Desconocida";
    }
  };

  const parsePaymentStatus = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.PENDING:
        return "Pendiente";
      case PaymentStatus.PAID:
        return "Pagada";
      case PaymentStatus.REFUNDED:
        return "Reembolsada";
      case PaymentStatus.PARTIALLY_REFUNDED:
        return "Reembolsada parcialmente";
      case PaymentStatus.FAILED:
        return "Fallida";
      case PaymentStatus.CANCELED:
        return "Cancelada";
      default:
        return "Desconocida";
    }
  };

  if (isPending) {
    return <ViewLoading />;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Órdenes</h1>
        </div>
        <div className="flex gap-2">
          <Button>Crear orden</Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead>Orden</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Pago</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((order) => (
              <TableRow
                onClick={() => navigate(`/admin/orders/${order.id}/detail`)}
                key={order.id + order.customer.name}
              >
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">#{order.id}</div>
                    <div className="text-sm text-muted-foreground">
                      {order.customer.name}
                    </div>
                  </div>
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

      {/* TODO: Implement pagination */}
      {/* <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-muted-foreground">Total 1</div>
        <div className="flex items-center gap-2">
          <Select defaultValue="50">
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" disabled>
            {"<"}
          </Button>
          <Button variant="outline" size="icon" disabled>
            {">"}
          </Button>
        </div>
      </div> */}
    </div>
  );
};

export default Orders;
