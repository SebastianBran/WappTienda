import { Module } from '@nestjs/common';
import { ConfigurationsService } from './configurations.service';
import { ConfigurationsController } from './configurations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from './entities/configuration.entity';
import { BootstrapConfigurationProvider } from './bootstrap-configuration.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Configuration])],
  providers: [ConfigurationsService, BootstrapConfigurationProvider],
  controllers: [ConfigurationsController],
})
export class ConfigurationsModule {}
