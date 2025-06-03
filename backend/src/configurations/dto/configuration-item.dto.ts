import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ConfigurationType } from '../entities/configuration-type.enum';

export class ConfigurationItemDto {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsOptional()
  value: string;

  @IsString()
  @IsOptional()
  type: ConfigurationType;
}
