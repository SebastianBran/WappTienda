import QuantitySelector from "@/components/common/QuantitySelector";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Product } from "@/types/products";
import { FC } from "react";

interface ProductInventoryProps {
  product: Product;
}

const ProductInventory: FC<ProductInventoryProps> = ({ product }) => {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Inventario</h2>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Habilitar stock</Label>
                <p className="text-sm text-muted-foreground">
                  Habilitar el seguimiento del inventario para este producto
                </p>
              </div>
              <Switch checked={product.trackInventory} />
            </div>
            <QuantitySelector className="mx-auto" quantity={product.totalInventory} onChange={() => {}} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductInventory;
