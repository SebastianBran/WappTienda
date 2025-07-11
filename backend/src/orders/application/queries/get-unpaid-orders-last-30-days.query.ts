import { Query } from '@nestjs/cqrs';

export class GetUnpaidOrdersLast30DaysQuery extends Query<number> {
  constructor() {
    super();
  }
}
