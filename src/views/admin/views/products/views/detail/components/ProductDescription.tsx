import { Card, CardContent } from "@/components/ui/card";
import { FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

const ProductDescription: FC = () => {
  const { control } = useFormContext();

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <h2 className="text-lg font-semibold">Descripción</h2>
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <Textarea
                className="min-h-[150px]"
                placeholder="Descripción del producto"
                {...field}
              />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default ProductDescription;
