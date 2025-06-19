import { ProductRepository } from 'src/orders/application/ports/product.repository';
import { ProductEntity } from '../entities/product.typeorm-entity';
import { Repository } from 'typeorm';
import { Product } from 'src/orders/domain/entities/product.entity';
import { ProductInfrastructureMapper } from '../mappers/product-infrastructure.mapper';
import { InjectRepository } from '@nestjs/typeorm';

export class TypeormProductRepository implements ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async findById(id: number): Promise<Product | null> {
    const productEntity = await this.productRepository.findOne({
      where: { id },
    });

    if (!productEntity) {
      return null;
    }

    return ProductInfrastructureMapper.entityToDomain(productEntity);
  }
}
