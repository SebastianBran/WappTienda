import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product } from "@/types/products";
import { FC } from "react";

interface ProductPricingProps {
  product: Product;
}

const ProductPricing: FC<ProductPricingProps> = ({ product }) => {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <h2 className="text-lg font-semibold">Precios</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Precio</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-muted-foreground">PEN</span>
              </div>
              <Input id="price" className="pl-12" value={product.salesPrice} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="original-price">Precio original</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-muted-foreground">PEN</span>
              </div>
              <Input id="price" className="pl-12" value={product.price} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductPricing;
