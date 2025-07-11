import { Query } from '@nestjs/cqrs';
import { Statistics } from 'src/statistics/domain/entities/statistics.entity';

export class GetStatisticsQuery extends Query<Statistics> {
  constructor() {
    super();
  }
}
