import { Query } from '@nestjs/cqrs';

export class GetTotalOrdersQuery extends Query<number> {
  constructor() {
    super();
  }
}
