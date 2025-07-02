import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/application/ports/user.repository';
import { User } from 'src/users/domain/entities/user.entity';
import { UserEntity } from '../entities/user.typeorm-entity';
import { Repository } from 'typeorm';
import { UserInfrastructureMapper } from '../mappers/user-infrastructure.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeormUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userInfrastructureMapper: UserInfrastructureMapper,
  ) {}

  async findById(id: number): Promise<User | null> {
    const userEntity = await this.userRepository.findOne({
      where: { id },
    });
    if (!userEntity) {
      return null;
    }
    return this.userInfrastructureMapper.entityToDomain(userEntity);
  }

  async findByUsername(username: string): Promise<User | null> {
    const userEntity = await this.userRepository.findOne({
      where: { username },
    });
    if (!userEntity) {
      return null;
    }
    return this.userInfrastructureMapper.entityToDomain(userEntity);
  }

  async existsMasterUser(): Promise<boolean> {
    const userEntity = await this.userRepository.findOne({
      where: { isMaster: true },
    });
    return !!userEntity;
  }

  async create(user: User): Promise<void> {
    const userEntity = this.userInfrastructureMapper.domainToEntity(user);
    const createdUser = this.userRepository.create(userEntity);
    await this.userRepository.save(createdUser);
  }

  async update(user: User): Promise<void> {
    const userEntity = this.userInfrastructureMapper.domainToEntity(user);
    await this.userRepository.save(userEntity);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
