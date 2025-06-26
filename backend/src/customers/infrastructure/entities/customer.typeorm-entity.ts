import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('customer')
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  email: string | null;

  @Column({
    unique: true,
  })
  @Index()
  phone: string;

  @Column({
    type: 'date',
    transformer: {
      to: (value: Date) => value || null,
      from: (value: Date) => {
        if (!value) return null;
        return new Date(value);
      },
    },
    nullable: true,
  })
  birthDate: Date | null;

  @Column({
    type: 'text',
    nullable: true,
  })
  notes: string | null;

  @Column({
    default: false,
  })
  @Index()
  deleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
