import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Configuration } from './entities/configuration.entity';
import { UpdateConfigurationsDto } from './dto/update-configurations.dto';
import { ConfigurationItemDto } from './dto/configuration-item.dto';

@Injectable()
export class ConfigurationsService {
  constructor(
    @InjectRepository(Configuration)
    private readonly configurationRepository: Repository<Configuration>,
  ) {}

  private readonly logger = new Logger(ConfigurationsService.name);

  getAll(): Promise<Configuration[]> {
    return this.configurationRepository.find();
  }

  async create(
    createConfigurationDto: ConfigurationItemDto,
  ): Promise<Configuration> {
    const existingConfig = await this.configurationRepository.findOne({
      where: {
        key: createConfigurationDto.key,
      },
    });

    if (existingConfig) {
      this.logger.warn(
        `Configuration with key '${createConfigurationDto.key}' already exist`,
      );
      return existingConfig;
    }

    return this.configurationRepository.save(createConfigurationDto);
  }

  async update(
    updateConfigurationsDto: UpdateConfigurationsDto,
  ): Promise<Configuration[]> {
    return Promise.all(
      updateConfigurationsDto.configurations.map(async (config) => {
        const configuration = await this.configurationRepository.findOne({
          where: {
            key: config.key,
          },
        });

        if (!configuration) {
          throw new NotFoundException(
            `Configuration with key '${config.key}' not found`,
          );
        }

        configuration.value = config.value;
        configuration.type = config.type;

        return this.configurationRepository.save(configuration);
      }),
    );
  }
}
