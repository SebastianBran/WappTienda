import { User } from 'src/users/domain/entities/user.entity';
import { UserEntity } from '../entities/user.typeorm-entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserInfrastructureMapper {
  public domainToEntity(user: User): UserEntity {
    const userEntity = new UserEntity();
    userEntity.id = user.getId();
    userEntity.username = user.getUsername();
    userEntity.password = user.getPassword();
    userEntity.role = user.getRole();
    userEntity.isMaster = user.isMasterUser();
    userEntity.created_at = user.getCreatedAt();
    userEntity.updated_at = user.getUpdatedAt();
    return userEntity;
  }

  public entityToDomain(userEntity: UserEntity): User {
    return new User(
      userEntity.id,
      userEntity.username,
      userEntity.password,
      userEntity.role,
      userEntity.isMaster,
      userEntity.created_at,
      userEntity.updated_at,
    );
  }
}
