import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from '../../commands/create-product.command';
import { ProductRepository } from '../../ports/product.repository';
import { BadRequestException, Inject } from '@nestjs/common';
import { ProductMapper } from '../../mappers/product.mapper';
import { Product } from 'src/products/domain/entities/product.entity';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(command: CreateProductCommand): Promise<Product> {
    const { sku } = command;

    if (sku) {
      const productExist = await this.productRepository.existBySku(sku);

      if (productExist) {
        throw new BadRequestException(`Product with SKU ${sku} already exists`);
      }
    }

    const product = ProductMapper.createProductCommandToDomain(command);

    return this.productRepository.create(product);
  }
}
