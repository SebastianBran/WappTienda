import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { ConfigurationsService } from './configurations.service';
import { UpdateConfigurationsDto } from './dto/update-configurations.dto';
import { Role } from 'src/users/domain/entities/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('configurations')
export class ConfigurationsController {
  constructor(private readonly configurationsService: ConfigurationsService) {}

  @Roles(Role.ADMIN, Role.WRITER, Role.READER)
  @Get()
  getAll(@Query('category') category: string) {
    return this.configurationsService.getAll(category);
  }

  @Roles(Role.ADMIN)
  @Put()
  update(@Body() updateConfigurationsDto: UpdateConfigurationsDto) {
    return this.configurationsService.update(updateConfigurationsDto);
  }
}
