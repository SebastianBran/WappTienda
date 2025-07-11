import { Query } from '@nestjs/cqrs';

export class GetPendingOrdersLast30DaysQuery extends Query<number> {
  constructor() {
    super();
  }
}
