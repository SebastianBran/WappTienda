import { Body, Controller, Get, Put } from '@nestjs/common';
import { ConfigurationsService } from './configurations.service';
import { UpdateConfigurationsDto } from './dto/update-configurations.dto';
import { Role } from 'src/users/entities/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('configurations')
export class ConfigurationsController {
  constructor(private readonly configurationsService: ConfigurationsService) {}

  @Roles(Role.ADMIN, Role.WRITER, Role.READER)
  @Get()
  getAll() {
    return this.configurationsService.getAll();
  }

  @Roles(Role.ADMIN, Role.WRITER)
  @Put()
  update(@Body() updateConfigurationsDto: UpdateConfigurationsDto) {
    return this.configurationsService.update(updateConfigurationsDto);
  }
}
