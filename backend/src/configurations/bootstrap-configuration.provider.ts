import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigurationsService } from './configurations.service';
import { ConfigurationItemDto } from './dto/configuration-item.dto';
import { ConfigurationType } from './entities/configuration-type.enum';

@Injectable()
export class BootstrapConfigurationProvider implements OnApplicationBootstrap {
  constructor(private readonly configurationsService: ConfigurationsService) {}

  private readonly logger = new Logger(BootstrapConfigurationProvider.name);

  async onApplicationBootstrap() {
    const defaultConfigs: ConfigurationItemDto[] = [
      {
        key: 'storeName',
        value: '',
        category: 'general',
        type: ConfigurationType.STRING,
      },
      {
        key: 'facebookProfile',
        value: '',
        category: 'general',
        type: ConfigurationType.STRING,
      },
      {
        key: 'instagramProfile',
        value: '',
        category: 'general',
        type: ConfigurationType.STRING,
      },
      {
        key: 'tiktokProfile',
        value: '',
        category: 'general',
        type: ConfigurationType.STRING,
      },
      {
        key: 'whatsappNumber',
        value: '',
        category: 'general',
        type: ConfigurationType.STRING,
      },
    ];

    await Promise.all(
      defaultConfigs.map((config) => {
        return this.configurationsService.create(config);
      }),
    );

    this.logger.debug('Default config created succesfully');
  }
}
