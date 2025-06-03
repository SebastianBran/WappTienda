import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ConfigurationItemDto } from './configuration-item.dto';

export class UpdateConfigurationsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConfigurationItemDto)
  configurations: ConfigurationItemDto[];
}
