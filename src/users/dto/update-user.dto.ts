import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../entities/role.enum';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(Role)
  role: Role;
}
