import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { productTypes } from "@/lib/constants";
import { Product } from "@/types/products";
import { FC } from "react";

interface ProductAtributesProps {
  product: Product;
}

const ProductAttributes: FC<ProductAtributesProps> = ({ product }) => {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">
            Nombre<span className="text-red-500">*</span>
          </Label>
          <Input id="name" defaultValue={product.name} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sku">
            SKU
          </Label>
          <Input id="sku" defaultValue={product.sku} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="visibility">Visibilidad</Label>
            <Select value={product.visible ? "visible" : "hidden"}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="visible">Visible</SelectItem>
                <SelectItem value="hidden">Oculto</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo</Label>
            <Select value={product.type}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {productTypes.map((type) => (
                  <SelectItem key={type.value + type.label} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductAttributes;
