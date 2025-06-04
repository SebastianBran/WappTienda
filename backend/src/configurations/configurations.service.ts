import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Configuration } from './entities/configuration.entity';
import { UpdateConfigurationsDto } from './dto/update-configurations.dto';
import { ConfigurationItemDto } from './dto/configuration-item.dto';
import { ConfigurationType } from './entities/configuration-type.enum';

@Injectable()
export class ConfigurationsService {
  constructor(
    @InjectRepository(Configuration)
    private readonly configurationRepository: Repository<Configuration>,
  ) {}

  private readonly logger = new Logger(ConfigurationsService.name);

  async getAll(
    category?: string,
  ): Promise<Record<string, string | boolean | number | object>> {
    const configs = await this.configurationRepository.find({
      where: {
        category: category,
      },
    });

    const mappedConfigs = configs.reduce(
      (acc, { key, value, type }) => {
        switch (type) {
          case ConfigurationType.BOOLEAN:
            return { ...acc, [key]: value === 'true' };
          case ConfigurationType.STRING:
            return { ...acc, [key]: value };
          case ConfigurationType.INTEGER:
            return { ...acc, [key]: Number(value) };
          case ConfigurationType.JSON:
            return { ...acc, [key]: JSON.parse(value) as object };
          default:
            return { ...acc, [key]: value };
        }
      },
      {} as Record<string, string | boolean | number | object>,
    );

    return mappedConfigs;
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
