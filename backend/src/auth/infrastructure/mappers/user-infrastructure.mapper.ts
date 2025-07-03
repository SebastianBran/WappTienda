import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/auth/application/dto/user.dto';
import { User } from 'src/users/domain/entities/user.entity';

@Injectable()
export class UserInfrastructureMapper {
  public domainToDto(user: User): UserDto {
    return new UserDto(
      user.getId(),
      user.getUsername(),
      user.getPassword(),
      user.getRole(),
      user.isMasterUser(),
      user.getCreatedAt(),
      user.getUpdatedAt(),
    );
  }
}
