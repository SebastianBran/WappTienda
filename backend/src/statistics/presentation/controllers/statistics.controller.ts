import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetStatisticsQuery } from 'src/statistics/application/queries/get-statistics.query';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  getAll() {
    return this.queryBus.execute(new GetStatisticsQuery());
  }
}
