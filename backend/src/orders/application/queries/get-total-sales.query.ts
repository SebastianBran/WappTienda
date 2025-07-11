import { Query } from '@nestjs/cqrs';

export class GetTotalSalesQuery extends Query<number> {
  constructor() {
    super();
  }
}
