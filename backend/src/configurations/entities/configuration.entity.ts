import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ConfigurationType } from './configuration-type.enum';

@Entity()
export class Configuration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  @Index()
  key: string;

  @Column({
    nullable: true,
  })
  value: string;

  @Column()
  category: string;

  @Column({
    type: 'enum',
    enum: ConfigurationType,
  })
  type: ConfigurationType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
