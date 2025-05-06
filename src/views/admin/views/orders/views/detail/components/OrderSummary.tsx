import { Card, CardContent } from "@/components/ui/card";
import { Order } from "@/types/orders";
import { FC } from "react";

interface OrderSummaryProps {
  order?: Order;
}

const OrderSummary: FC<OrderSummaryProps> = ({ order }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Artículos</h3>
            <p className="text-sm text-muted-foreground">
              {order?.totalItems}{" "}
              {order?.totalItems && order.totalItems > 1
                ? "artículos"
                : "artículo"}
            </p>
          </div>
          {order?.orderItems.map((item) => (
            <div className="flex flex-col" key={item.id + item.product.name}>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span>{item.quantity}x</span>
                  <span>{item.product.name}</span>
                </div>
                <span>S/ {item.price * item.quantity}</span>
              </div>
            </div>
          ))}
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>S/ {order?.subtotalAmount}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>S/ {order?.totalAmount}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
