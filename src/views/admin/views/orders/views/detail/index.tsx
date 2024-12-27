import { ArrowLeft, Copy, ExternalLink, Info, MoreHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';

const OrderDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin/orders")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-semibold">
              #2 Estefano Sebastian Bran Zapata
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Eliminar</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            {/* Status Section */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Estado</Label>
                    <Select defaultValue="pending">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pendiente</SelectItem>
                        <SelectItem value="processing">En Proceso</SelectItem>
                        <SelectItem value="completed">Completado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Estado del Pago</Label>
                    <Select defaultValue="unpaid">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unpaid">No Pagado</SelectItem>
                        <SelectItem value="paid">Pagado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label>Enlace de Pago</Label>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex gap-2">
                    <Input value="https://take.app/floresjuan" readOnly />
                    <Button variant="outline" size="icon">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Nota Interna</Label>
                  <Textarea placeholder="Añadir una nota (invisible para los clientes)" />
                </div>

                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <p className="text-muted-foreground">
                    Arrastra un archivo aquí o haz clic para seleccionar uno
                  </p>
                  <p className="text-sm text-muted-foreground">
                    El archivo no debe exceder los 10mb. La proporción recomendada es 1:1.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Artículos</h3>
                    <p className="text-sm text-muted-foreground">1 artículo</p>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-4">
                      <span>1x</span>
                      <span>Girasol</span>
                    </div>
                    <span>S/ 3.00</span>
                  </div>
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Total de artículos (1)</span>
                      <span>S/ 3.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>S/ 3.00</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>S/ 3.00</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Cliente</h3>
                    <Button variant="ghost" size="sm" onClick={() => navigate("/admin/customers/1/detail")}>
                      Ver
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-sm text-muted-foreground">Nombre</span>
                      <span className="col-span-2">
                        Estefano Sebastian Bran Zapata
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-sm text-muted-foreground">Teléfono</span>
                      <span className="col-span-2">51987961985</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
