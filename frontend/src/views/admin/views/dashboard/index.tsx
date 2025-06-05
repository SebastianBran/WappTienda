import useGetStatisticsQuery from "@/api/queries/useGetStatisticsQuery";
import ViewLoading from "@/components/common/ViewLoading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCardIcon, ShoppingCart } from "lucide-react";

const Dashboard = () => {
  const { data: statistics, isPending } = useGetStatisticsQuery();

  if (isPending || !statistics) {
    return <ViewLoading />;
  }

  return (
    <div className="grid justify-items-center max-w-3xl mx-auto p-4">
      <div className="grid grid-cols-2 gap-4 w-full">
        <Card className="grid p-4">
          <span className="">Órdenes</span>
          <span className="font-bold">{statistics.totalOrders}</span>
        </Card>

        <Card className="grid p-4">
          <span>Ventas</span>
          <span className="font-bold">S/ {statistics.totalSales}</span>
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
            <span className="text-center self-center text-sm">
              {statistics.last30days.pendingOrders} órdenes pendientes
            </span>
          </div>
          <div className="flex gap-4 p-2 border rounded-md">
            <CreditCardIcon className="size-8 bg-teal-100 p-2 rounded-md" />
            <span className="text-center self-center text-sm">
              {statistics.last30days.unpaidOrders} órdenes sin pagar
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
