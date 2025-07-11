export class StatisticsLast30Days {
  constructor(
    private readonly pendingOrders: number,
    private readonly unpaidOrders: number,
  ) {}
}

export class Statistics {
  constructor(
    private readonly totalOrders: number,
    private readonly totalSales: number,
    private readonly last30days: StatisticsLast30Days,
  ) {}

  static create(
    totalOrders: number,
    totalSales: number,
    pendingOrders: number,
    unpaidOrders: number,
  ) {
    const last30days = new StatisticsLast30Days(pendingOrders, unpaidOrders);
    return new Statistics(totalOrders, totalSales, last30days);
  }
}
