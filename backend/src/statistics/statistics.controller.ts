import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticService: StatisticsService) {}

  @Get()
  getAll() {
    return this.statisticService.getStatistics();
  }
}
