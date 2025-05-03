import { ArrowLeft, Info, MoreHorizontal, ImageIcon, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
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
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="container max-w-3xl mx-auto py-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin/products")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">Producto</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Eliminar</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-8">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre<span className="text-red-500">*</span></Label>
              <Input id="name" defaultValue="Rosa" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="visibility">Visibilidad</Label>
              <Select defaultValue="visible">
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
              <Select defaultValue="physical">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="physical">Físico</SelectItem>
                  <SelectItem value="digital">Digital</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Precios</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Precio</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-muted-foreground">PEN</span>
                  </div>
                  <Input id="price" defaultValue="5" className="pl-12" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="original-price">Precio original</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-muted-foreground">PEN</span>
                  </div>
                  <Input id="price" defaultValue="5" className="pl-12" />
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Descripción</h2>
            <Textarea className="min-h-[150px]" />
          </div>
          {/* Imágenes */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Imágenes</h2>
            <div className="grid grid-cols-6 gap-4">
              <div className="relative aspect-square">
                <img
                  src="https://via.placeholder.com/48"
                  alt="Girasol"
                  width={48}
                  height={48}
                  className="rounded-lg object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6 bg-background/80"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <div className="flex flex-col items-center gap-2">
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Arrastra un archivo aquí o haz clic para seleccionar uno
                </p>
                <p className="text-xs text-muted-foreground">
                  El archivo no debe exceder los 10mb. La proporción recomendada es 1:1.
                </p>
              </div>
            </div>
          </div>

          {/* Inventario */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Inventario</h2>
              <Info className="h-4 w-4 text-muted-foreground" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Rastrear cantidad</Label>
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
                <Switch disabled />
              </div>

              <Card className="bg-green-50 border-green-100">
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Mejora para establecer límite diario</h3>
                    <p className="text-sm text-muted-foreground">
                      Mejora a un plan de pago para limitar el número de artículos a vender por día.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full" variant="default">
                      Mejorar a Premium
                    </Button>
                    <Button className="w-full" variant="link">
                      Aprende más
                    </Button>
                  </div>
                </div>
              </Card>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Cantidad máxima por pedido</Label>
                  <p className="text-sm text-muted-foreground">
                    El número máximo de artículos que los clientes pueden comprar por pedido
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Cantidad mínima por pedido</Label>
                  <p className="text-sm text-muted-foreground">
                    El número mínimo de artículos que los clientes deben comprar por pedido
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductDetail;
