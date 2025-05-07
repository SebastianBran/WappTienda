import { Card, CardContent } from "@/components/ui/card";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

const ProductInventory: FC = () => {
  const { control, watch } = useFormContext();
  const trackInventory = watch("trackInventory");

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Inventario</h2>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-4">
            <FormField
              control={control}
              name="trackInventory"
              render={({ field }) => (
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <FormLabel htmlFor="trackInventory">
                      Habilitar stock
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Habilitar el seguimiento del inventario para este producto
                    </p>
                  </div>
                  <Switch
                    id="trackInventory"
                    {...field}
                    onCheckedChange={field.onChange}
                    checked={field.value}
                  />
                </div>
              )}
            />

            {trackInventory && (
              <FormField
                control={control}
                name="totalInventory"
                render={({ field }) => (
                  <FormItem>
                    <Input
                      id="price"
                      type="number"
                      min={0}
                      step={1}
                      {...field}
                      onChange={(e) => {
                        const value = Number(e.target.value || 0);
                        field.onChange(value);
                      }}
                    />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductInventory;
