import HeaderBrandButton from "@/components/common/HeaderBrandButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
//TODO: delete this file
const CreateStore = () => {
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("/admin");
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="py-4">
        <div className="container mx-auto flex justify-between items-center">
          <HeaderBrandButton className="text-xl" />
        </div>
      </header>

      <main className="h-full flex flex-col items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">Crea una nueva tienda</h1>
          <p className="text-gray-500 mb-6">
            Ingrese la información esencial de su tienda
          </p>
        </div>

        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <form
              onSubmit={() => {
                onSubmit();
              }}
              className="space-y-4"
            >
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  placeholder="Ingrese el nombre de su tienda"
                  name="name"
                  id="name"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="whatsappNumber">Número de WhatsApp</Label>
                <span className="text-xs text-slate-500">
                  Los clientes se comunicarán contigo a través de este número
                </span>
                <div className="flex">
                  <div className="mr-2">
                    <Select defaultValue="+51" name="country-code">
                      <SelectTrigger className="border rounded-lg px-4 py-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+51">+51</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder="Ingrese su número de WhatsApp"
                      name="whatsappNumber"
                      id="whatsappNumber"
                      required
                      type="tel"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="currency">Moneda</Label>
                <Select name="currency" defaultValue="PEN">
                  <SelectTrigger className="border rounded-lg px-4 py-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PEN">PEN</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="storeLink">Link de la tienda</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-sm text-gray-500">
                      wapptienda/store/
                    </span>
                  </div>
                  <Input placeholder="floresjuan" className="pl-[135px]" />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Crear
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CreateStore;
