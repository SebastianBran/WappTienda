import { ArrowLeft, Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import useGetCustomerByIdQuery from "@/api/queries/useGetCustomerByIdQuery";
import ViewLoading from "@/components/common/ViewLoading";
import { OrderStatus, PaymentStatus } from "@/types/orders";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import useDeleteCustomerMutation from "@/api/mutations/useDeleteCustomerMutation";
import DeleteElementDialog from "@/components/common/DeleteElementDialog";

const CustomerDetail = () => {
  const navigate = useNavigate();
  const { customerId } = useParams();
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);
  const { data: customer, isPending } = useGetCustomerByIdQuery(
    Number(customerId || 0),
  );
  const { mutate: deleteCustomerMutation } = useDeleteCustomerMutation();

  if (isPending || !customer) {
    return <ViewLoading />;
  }

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

  const totalSpent = customer.orders.reduce((acc, order) => {
    return acc + order.totalAmount;
  }, 0);

  let averageSpent: string = "0.00";
  if (customer.orders.length > 0) {
    averageSpent = Number(totalSpent / customer.orders.length).toFixed(2);
  }

  const lastOrderDate = () => {
    if (!customer.orders.length) {
      return "--";
    }

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

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(customer.phone);
    setShowCopyTooltip(true);
    setTimeout(() => {
      setShowCopyTooltip(false);
    }, 2000);
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
    <div className="container mx-auto py-6">
      <div className="space-y-6">
        {/* Header */}
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

        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            {/* Order Statistics */}
            <div className="grid gap-4 sm:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Pedidos</p>
                    <p className="text-2xl font-bold">
                      {customer.orders.length}
                    </p>
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
                    <p className="text-sm text-muted-foreground">
                      Total gastado
                    </p>
                    <p className="text-2xl font-bold">S/ {totalSpent}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Last Orders */}
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
                      onClick={() =>
                        navigate(`/admin/orders/${order.id}/detail`)
                      }
                      key={order.id + customer.name}
                    >
                      <TableCell>
                        <div className="font-medium">#{order.id}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString(
                            "es-ES",
                          )}
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
          </div>

          {/* Customer Info Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">
                    Información del cliente
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      navigate(`/admin/customers/${customer.id}/edit`)
                    }
                  >
                    Editar
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Teléfono</p>
                    <div className="flex items-center gap-2">
                      <p className="text-blue-500">{customer.phone}</p>
                      {/* TODO: Abstract to component */}
                      <TooltipProvider>
                        <Tooltip open={showCopyTooltip}>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={handleCopyPhone}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-white text-black border border-gray-300 rounded-md shadow-md p-2">
                            ¡Copiado al portapapeles!
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
