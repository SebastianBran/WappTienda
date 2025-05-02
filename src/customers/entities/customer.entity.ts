import { Order } from 'src/orders/entities/order.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  email: string;

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
  birthDate: Date;

  @Column({
    type: 'text',
    nullable: true,
  })
  notes: string;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  @Column({
    default: false,
  })
  @Index()
  deleted: boolean;
}
