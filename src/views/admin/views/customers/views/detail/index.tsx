import { ArrowLeft, Copy } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

const CustomerDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/admin/customers')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="space-y-1">
              <h1 className="text-xl font-semibold">
                Estefano Sebastian Bran Zapata
              </h1>
              <p className="text-sm text-muted-foreground">
                Último pedido 28 Nov 2024
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="destructive">Eliminar</Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            {/* Order Statistics */}
            <div className="grid gap-4 sm:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Pedidos</p>
                    <p className="text-2xl font-bold">1</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Valor promedio del pedido</p>
                    <p className="text-2xl font-bold">S/ 3.00</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Total gastado</p>
                    <p className="text-2xl font-bold">S/ 3.00</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Last Orders */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Últimos pedidos</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Button className="text-blue-500 hover:underline" variant='ghost' onClick={() => navigate('/admin/orders/1/detail')}>
                          #2
                        </Button>
                        <div className="flex gap-1">
                          <Badge variant="secondary">PENDIENTE</Badge>
                          <Badge variant="secondary">NO PAGADO</Badge>
                          <Badge variant="secondary">NO CUMPLIDO</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        28 Nov 2024 23:26
                      </p>
                    </div>
                    <p className="font-medium">S/ 3.00</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Customer Info Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Información del cliente</h2>
                  <Button variant="outline" size="sm" onClick={() => navigate('/admin/customers/1/edit')}>
                    Editar
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Teléfono</p>
                    <div className="flex items-center gap-2">
                      <p className="text-blue-500">+51 987 961 985</p>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerDetail;
