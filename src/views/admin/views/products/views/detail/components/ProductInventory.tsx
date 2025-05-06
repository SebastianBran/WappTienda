import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FC } from "react";

interface ProductInventoryProps {}

const ProductInventory: FC<ProductInventoryProps> = () => {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Inventario</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Habilitar stock</Label>
              <p className="text-sm text-muted-foreground">
                Habilitar el seguimiento del inventario para este producto
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Capacidad diaria</Label>
              <p className="text-sm text-muted-foreground">
                El número máximo de artículos que puedes vender por día
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Cantidad máxima por pedido</Label>
              <p className="text-sm text-muted-foreground">
                El número máximo de artículos que los clientes pueden comprar
                por pedido
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Cantidad mínima por pedido</Label>
              <p className="text-sm text-muted-foreground">
                El número mínimo de artículos que los clientes deben comprar por
                pedido
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductInventory;
