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

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({
    type: 'date',
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => new Date(value),
    },
  })
  birthDate: Date;

  @Column()
  notes: string;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  @Column({
    default: false,
  })
  @Index()
  deleted: boolean;
}
