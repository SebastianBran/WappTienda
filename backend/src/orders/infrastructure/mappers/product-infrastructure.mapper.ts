import { Product } from 'src/orders/domain/entities/product.entity';
import { ProductEntity } from '../entities/product.typeorm-entity';

export class ProductInfrastructureMapper {
  static domainToEntity(product: Product): ProductEntity {
    const productEntity = new ProductEntity();
    productEntity.id = product.getId();
    productEntity.sku = product.getSku() || '';
    productEntity.name = product.getName();
    productEntity.type = product.getType();
    productEntity.description = product.getDescription() || '';
    productEntity.price = product.getPrice();
    productEntity.salesPrice = product.getSalesPrice();
    productEntity.trackInventory = product.isTrackInventory();
    productEntity.totalInventory = product.getTotalInventory();
    productEntity.visible = product.isVisible();
    productEntity.deleted = product.isDeleted();
    return productEntity;
  }

  static entityToDomain(productEntity: ProductEntity): Product {
    return new Product(
      productEntity.id,
      productEntity.sku || null,
      productEntity.name,
      productEntity.type,
      productEntity.description || null,
      productEntity.price,
      productEntity.salesPrice,
      productEntity.trackInventory,
      productEntity.totalInventory,
      productEntity.visible,
      productEntity.deleted,
      productEntity.createdAt,
      productEntity.updatedAt,
    );
  }
}
