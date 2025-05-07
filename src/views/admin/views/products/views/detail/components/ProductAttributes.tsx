import { Card, CardContent } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { productTypes } from "@/lib/constants";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

const ProductAttributes: FC = () => {
  const { control } = useFormContext();

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">
                  Nombre<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input id="name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <FormField
            control={control}
            name="sku"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="sku">SKU</FormLabel>
                <FormControl>
                  <Input id="sku" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <FormField
              control={control}
              name="visible"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="visible">Visibilidad</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value === "visible");
                    }}
                    value={field.value ? "visible" : "hidden"}
                    name={field.name}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue ref={field.ref} onBlur={field.onBlur} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="visible">Visible</SelectItem>
                      <SelectItem value="hidden">Oculto</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <FormField
              control={control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="type">Tipo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    name={field.name}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue ref={field.ref} onBlur={field.onBlur} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {productTypes.map((type) => (
                        <SelectItem
                          key={type.value + type.label}
                          value={type.value}
                        >
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductAttributes;
