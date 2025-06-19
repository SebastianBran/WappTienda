import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderEntity } from './order.typeorm-entity';
import { ProductEntity } from './product.typeorm-entity';

@Entity('order_item')
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  price: number;

  @ManyToOne(() => ProductEntity, (product) => product.orderItems)
  @JoinColumn()
  product: ProductEntity;

  @ManyToOne(() => OrderEntity, (order) => order.orderItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  order: OrderEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
