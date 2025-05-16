import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CreateOrderSchema } from "@/schemas/createOrder.schema";
import { Trash } from "lucide-react";
import { FC } from "react";
import { FieldArrayWithId, useFormContext } from "react-hook-form";

interface ItemCardProps {
  item: FieldArrayWithId<CreateOrderSchema>;
  index: number;
  onRemove: (index: number) => void;
}

const ItemCard: FC<ItemCardProps> = ({ item, index, onRemove }) => {
  const { control, watch } = useFormContext<CreateOrderSchema>();

  const price = watch(`orderItems.${index}.price`);
  const quantity = watch(`orderItems.${index}.quantity`);
  const total = (price * quantity).toFixed(2);

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    onRemove(index);
  };

  return (
    <div className={cn("flex gap-4", index !== 0 && "border-t pt-4")}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col">
          <label
            htmlFor={`productName-${index}`}
            className="text-sm font-medium"
          >
            Producto
          </label>
          <span id={`productName-${index}`} className="block text-sm">
            {item.productName}
          </span>
        </div>
        <FormField
          control={control}
          name={`orderItems.${index}.price`}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={`price-${index}`}>
                Precio por unidad
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  id={`price-${index}`}
                  type="number"
                  min={0}
                  step="0.01"
                  {...field}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    field.onChange(value);
                  }}
                  required
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`orderItems.${index}.quantity`}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={`quantity-${index}`}>
                Cantidad<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  id={`quantity-${index}`}
                  type="number"
                  min={1}
                  {...field}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    field.onChange(value);
                  }}
                  required
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="text-sm font-bold">S/ {total}</div>
      </div>
      <div className="flex">
        <Button variant="ghost" onClick={handleRemove}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ItemCard;
