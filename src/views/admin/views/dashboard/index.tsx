import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCardIcon, ShoppingCart } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="grid justify-items-center max-w-3xl mx-auto">
      <div className="grid grid-cols-2 gap-4 w-full">
        <Card className="grid p-4">
          <span className="">Órdenes</span>
          <span className="font-bold">0</span>
        </Card>

        <Card className="grid p-4">
          <span>Ventas</span>
          <span className="font-bold">S/ 0.00</span>
        </Card>
      </div>

      <Card className="w-full mt-4">
        <CardHeader>
          <CardTitle>Órdenes</CardTitle>
          <CardDescription>Últimos 30 días</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex gap-4 p-2 border rounded-md">
            <ShoppingCart className="size-8 bg-teal-100 p-2 rounded-md" />
            <span className="text-center self-center text-sm">2 órdenes pendientes</span>
          </div>
          <div className="flex gap-4 p-2 border rounded-md">
            <CreditCardIcon className="size-8 bg-teal-100 p-2 rounded-md" />
            <span className="text-center self-center text-sm">2 órdenes sin pagar</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard;
