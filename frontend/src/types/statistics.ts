export interface StatisticLast30Days {
  pendingOrders: number;
  unpaidOrders: number;
}

export interface Statistics {
  totalOrders: number;
  totalSales: number;
  last30days: StatisticLast30Days;
}
