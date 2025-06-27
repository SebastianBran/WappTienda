import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductRepository } from '../../ports/product.repository';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ProductMapper } from '../../mappers/product.mapper';
import { Product } from 'src/products/domain/entities/product.entity';
import { UpdateProductCommand } from '../../commands/update-product.command';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler
  implements ICommandHandler<UpdateProductCommand>
{
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(command: UpdateProductCommand): Promise<Product> {
    const { sku } = command;

    if (sku) {
      const productExist = await this.productRepository.existBySku(sku);

      if (productExist) {
        throw new BadRequestException(`Product with SKU ${sku} already exists`);
      }
    }

    const { id: productId } = command;

    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    const updatedProduct = ProductMapper.updateProductCommandToDomain(
      command,
      product,
    );

    return this.productRepository.update(updatedProduct);
  }
}
