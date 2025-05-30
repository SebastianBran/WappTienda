import { Customer } from "@/types/customers";
import { useMemo } from "react";

interface CustomerStats {
  totalSpent: number;
  averageSpent: number;
  totalOrders: number;
  lastOrder: string | null;
}

const useCustomerStats = (customer: Customer): CustomerStats => {
  const data: CustomerStats = useMemo(() => {
    if (!customer.orders || !customer.orders.length) {
      return {
        totalSpent: 0,
        totalOrders: 0,
        averageSpent: 0,
        lastOrder: null,
      };
    }

    const lastOrder = customer.orders.reduce((latest, current) => {
      return new Date(current.created_at) > new Date(latest.created_at)
        ? current
        : latest;
    });
    const lastOrderDate = new Date(lastOrder.created_at).toLocaleDateString(
      "es-Es",
    );

    const totalSpent = customer.orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0,
    );
    const totalOrders = customer.orders.length;
    const averageSpent = totalSpent / totalOrders;

    return {
      totalSpent: Number(totalSpent.toFixed(2)),
      averageSpent: Number(averageSpent.toFixed(2)),
      totalOrders,
      lastOrder: lastOrderDate,
    };
  }, [customer.orders]);

  return data;
};

export default useCustomerStats;
