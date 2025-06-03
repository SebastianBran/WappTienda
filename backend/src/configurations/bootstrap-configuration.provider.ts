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
        key: 'store-name',
        value: '',
        type: ConfigurationType.STRING,
      },
      {
        key: 'facebook-profile',
        value: '',
        type: ConfigurationType.STRING,
      },
      {
        key: 'instagram-profile',
        value: '',
        type: ConfigurationType.STRING,
      },
      {
        key: 'tiktok-profile',
        value: '',
        type: ConfigurationType.STRING,
      },
      {
        key: 'whatsapp-number',
        value: '',
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
