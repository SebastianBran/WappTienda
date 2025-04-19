import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductType } from './product-type.enum';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sku: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ProductType,
    default: ProductType.PHYSICAL,
  })
  type: string;

  @Column()
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

  @Column()
  totalInventory: number;

  @Column()
  visible: boolean;
}
