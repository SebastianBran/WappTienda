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

  @Column()
  value: string;

  @Column()
  category: string;

  @Column({
    type: 'enum',
    enum: ConfigurationType,
  })
  type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
