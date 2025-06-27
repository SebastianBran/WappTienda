import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from 'src/products/application/ports/product.repository';
import { Product } from 'src/products/domain/entities/product.entity';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.typeorm-entity';
import { ProductInfraestructureMapper } from '../mappers/product-infraestructure.mapper';

export class TypeOrmProductRepository implements ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
  ) {}

  async findAllActive(offset?: number, limit?: number): Promise<Product[]> {
    const productEntities = await this.repository.find({
      where: { deleted: false },
      skip: offset,
      take: limit,
    });
    return productEntities.map((product) =>
      ProductInfraestructureMapper.entityToDomain(product),
    );
  }

  async findById(id: number): Promise<Product | null> {
    const productEntity = await this.repository.findOne({
      where: { id },
    });
    if (!productEntity) {
      return null;
    }
    return ProductInfraestructureMapper.entityToDomain(productEntity);
  }

  async findActiveById(id: number): Promise<Product | null> {
    const productEntity = await this.repository.findOne({
      where: { id, deleted: false },
    });
    if (!productEntity) {
      return null;
    }
    return ProductInfraestructureMapper.entityToDomain(productEntity);
  }

  existBySku(sku: string): Promise<boolean> {
    return this.repository.existsBy({ sku, deleted: false });
  }

  async create(product: Product): Promise<Product> {
    const productEntity = ProductInfraestructureMapper.domainToEntity(product);
    const productCreated = this.repository.create(productEntity);
    const newProduct = await this.repository.save(productCreated);
    return ProductInfraestructureMapper.entityToDomain(newProduct);
  }

  async update(product: Product): Promise<Product> {
    const productEntity = ProductInfraestructureMapper.domainToEntity(product);
    const savedProduct = await this.repository.save(productEntity);
    return ProductInfraestructureMapper.entityToDomain(savedProduct);
  }
}
