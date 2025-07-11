export abstract class OrdersService {
  abstract getPendingOrdersLast30Days(): Promise<number>;
  abstract getTotalsOrders(): Promise<number>;
  abstract getTotalsSales(): Promise<number>;
  abstract getUnpaidOrdersLast30Days(): Promise<number>;
}
