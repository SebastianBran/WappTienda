import { ProductFactory } from 'src/products/domain/factories/product.factory';
import { CreateProductCommand } from '../commands/create-product.command';
import { UpdateProductCommand } from '../commands/update-product.command';
import { Product } from 'src/products/domain/entities/product.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductMapper {
  constructor(private readonly productFactory: ProductFactory) {}

  public createProductCommandToDomain(command: CreateProductCommand) {
    return this.productFactory.create(
      command.sku,
      command.name,
      command.type,
      command.description,
      command.price,
      command.salesPrice,
      command.trackInventory,
      command.totalInventory,
      command.visible,
    );
  }

  public updateProductCommandToDomain(
    command: UpdateProductCommand,
    product: Product,
  ): Product {
    if (command.name !== undefined) {
      product.setName(command.name);
    }

    if (command.type !== undefined) {
      product.setType(command.type);
    }

    if (command.price !== undefined) {
      product.setPrice(command.price);
    }

    if (command.salesPrice !== undefined) {
      product.setSalesPrice(command.salesPrice);
    }

    if (command.trackInventory !== undefined) {
      product.setTrackInventory(command.trackInventory);
    }

    if (command.totalInventory !== undefined) {
      product.setTotalInventory(command.totalInventory);
    }

    if (command.visible !== undefined) {
      product.setVisibility(command.visible);
    }

    if (command.sku !== undefined) {
      product.setSku(command.sku);
    }

    if (command.description !== undefined) {
      product.setDescription(command.description);
    }

    return product;
  }
}
