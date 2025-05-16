import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CreateOrderSchema } from "@/schemas/createOrder.schema";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

const OrderSummaryCard: FC = () => {
  const { watch } = useFormContext<CreateOrderSchema>();
  const orderItems = watch("orderItems");
  const totalAmount = orderItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <Card>
      <CardTitle className="px-6 pt-6 text-lg font-semibold">
        Resumen de la orden
      </CardTitle>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Artículos</h3>
            <p className="text-sm text-muted-foreground">
              {orderItems.length}{" "}
              {orderItems.length > 1 ? "artículos" : "artículo"}
            </p>
          </div>
          {orderItems.map((items) => (
            <div
              className="flex flex-col"
              key={items.productId + items.productName}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span>{items.quantity}x</span>
                  <span>{items.productName}</span>
                </div>
                <span>S/ {items.price * items.quantity}</span>
              </div>
            </div>
          ))}
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>S/ {totalAmount}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>S/ {totalAmount}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummaryCard;
