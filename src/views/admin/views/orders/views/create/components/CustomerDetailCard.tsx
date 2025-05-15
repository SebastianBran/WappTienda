import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateOrderSchema } from "@/schemas/createOrder.schema";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

const CustomerDetailCard: FC = () => {
  const { control } = useFormContext<CreateOrderSchema>();

  return (
    <Card>
      <CardTitle className="px-6 pt-6 text-lg font-semibold">Cliente</CardTitle>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <FormField
            control={control}
            name="customer.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">
                  Nombre<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input id="name" {...field} required />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <FormField
            control={control}
            name="customer.phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="phone">
                  Teléfono<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input id="phone" type="tel" {...field} required />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerDetailCard;
