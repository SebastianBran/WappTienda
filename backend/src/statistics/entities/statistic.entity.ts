export class StatisticLast30Days {
  constructor(
    private readonly pendingOrders: number,
    private readonly unpaidOrders: number,
  ) {}
}

export class Statistic {
  constructor(
    public readonly totalOrders: number,
    public readonly totalSales: number,
    public readonly last30days: StatisticLast30Days,
  ) {}

  static create(
    totalOrders: number,
    totalSales: number,
    pendingOrders: number,
    unpaidOrders: number,
  ) {
    const last30days = new StatisticLast30Days(pendingOrders, unpaidOrders);
    return new Statistic(totalOrders, totalSales, last30days);
  }
}
