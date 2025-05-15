import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { FC } from "react";
import AddProductDialog from "./AddProductDialog";
import { useFieldArray, useFormContext } from "react-hook-form";
import { CreateOrderSchema } from "@/schemas/createOrder.schema";
import ItemCard from "./ItemCard";

const OrderItemsCard: FC = () => {
  const { control } = useFormContext<CreateOrderSchema>();
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "orderItems",
  });

  return (
    <Card>
      <CardTitle className="px-6 pt-6 text-lg font-semibold">
        Products
      </CardTitle>
      <CardContent className="p-6 space-y-4">
        {fields.length > 0 ? (
          fields.map((item, index) => {
            return (
              <ItemCard
                key={item.id}
                item={item}
                index={index}
                onRemove={remove}
              />
            );
          })
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-gray-500">Añade productos a la orden</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end p-6">
        <AddProductDialog appendProduct={append} />
      </CardFooter>
    </Card>
  );
};

export default OrderItemsCard;
