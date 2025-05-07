import { Card, CardContent } from "@/components/ui/card";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

const ProductPricing: FC = () => {
  const { control } = useFormContext();

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <h2 className="text-lg font-semibold">Precios</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <FormField
              control={control}
              name="salesPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="price">Precio</FormLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-muted-foreground">PEN</span>
                    </div>
                    <Input
                      id="price"
                      className="pl-12"
                      type="number"
                      min={0}
                      step={0.01}
                      {...field}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value || "0");
                        field.onChange(value);
                      }}
                    />
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="price">Precio original</FormLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-muted-foreground">PEN</span>
                    </div>
                    <Input
                      id="price"
                      className="pl-12"
                      type="number"
                      min={0}
                      step={0.01}
                      {...field}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value || "0");
                        field.onChange(value);
                      }}
                    />
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductPricing;
