import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/users/domain/entities/role.enum';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(Role)
  role: Role;
}
