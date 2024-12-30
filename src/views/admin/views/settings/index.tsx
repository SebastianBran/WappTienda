import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, ChevronLeft } from 'lucide-react';
import { useSidebar } from "@/components/ui/sidebar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const { setOpen } = useSidebar();

  useEffect(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <Button className="flex items-center gap-2 text-sm font-medium" variant='ghost' onClick={() => navigate('/admin/123')}>
              <ChevronLeft className="h-4 w-4" />
              Volver al panel
            </Button>
          </div>
        </header>

        <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
          <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
            <nav className="grid items-start px-4 py-4 text-sm">
              <Button 
                className="gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all justify-start hover:text-foreground"
                variant='ghost'
                onClick={() => navigate('/admin/settings')}
              >
                General
              </Button>
            </nav>
          </aside>

          <main className="flex w-full flex-col gap-6 p-4 md:gap-8 md:p-8">
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-bold tracking-tight">Configuración general</h1>

              <Card>
                <CardHeader>
                  <CardTitle>Perfil</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input id="name" placeholder="Ingrese el nombre de la tienda" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="store-url">URL de la tienda</Label>
                    <Input id="store-url" placeholder="tu-tienda" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Configuración de WhatsApp</CardTitle>
                  <CardDescription>Configura los ajustes de tu WhatsApp Business</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="whatsapp">Número de WhatsApp</Label>
                    <div className="flex gap-2">
                      <Select defaultValue="+51">
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="País" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="+51">+51</SelectItem>
                          <SelectItem value="+1">+1</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input id="whatsapp" placeholder="Número de WhatsApp" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regional</CardTitle>
                  <CardDescription>Configura los ajustes regionales</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="language">Idioma</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el idioma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">Inglés</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="currency">Moneda</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona la moneda" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD</SelectItem>
                        <SelectItem value="eur">EUR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Redes Sociales</CardTitle>
                  <CardDescription>Conecta tus cuentas de redes sociales</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input id="facebook" placeholder="URL del perfil de Facebook" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input id="instagram" placeholder="URL del perfil de Instagram" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="telegram">Telegram</Label>
                    <Input id="telegram" placeholder="Nombre de usuario de Telegram" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-destructive">
                <CardHeader>
                  <CardTitle className="text-destructive">Zona de peligro</CardTitle>
                  <CardDescription>Cuidado, estas acciones no se pueden deshacer</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Desactivar tienda</Label>
                      <p className="text-sm text-muted-foreground">
                        Desactiva temporalmente tu tienda y todos los pedidos
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <Separator />
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Eliminar tu tienda eliminará permanentemente todos los datos asociados
                    </AlertDescription>
                  </Alert>
                  <Button variant="destructive">Eliminar tienda</Button>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end">
              <Button>Guardar cambios</Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Settings;
