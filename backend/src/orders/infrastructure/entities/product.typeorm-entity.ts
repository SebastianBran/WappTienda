import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderItemEntity } from './order-item.typeorm-entity';
import { ProductType } from 'src/orders/domain/entities/product-type.enum';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  @Index()
  sku: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ProductType,
    default: ProductType.PHYSICAL,
  })
  type: ProductType;

  @Column({
    nullable: true,
  })
  description: string;

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

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  salesPrice: number;

  @Column()
  trackInventory: boolean;

  @Column({
    default: 0,
  })
  totalInventory: number;

  @Column({
    default: true,
  })
  @Index()
  visible: boolean;

  @Column({
    default: false,
  })
  @Index()
  deleted: boolean;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.product)
  orderItems: OrderItemEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
