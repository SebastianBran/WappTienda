import { Module } from '@nestjs/common';
import { ProductsController } from './presentation/controllers/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './infrastucture/entities/product.typeorm-entity';
import { CreateProductHandler } from './application/handlers/commands/create-product.handler';
import { TypeOrmProductRepository } from './infrastucture/adapters/typeorm-product.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { UpdateProductHandler } from './application/handlers/commands/update-product.handler';
import { GetProductHandler } from './application/handlers/queries/get-product.handler';
import { GetProductsHandler } from './application/handlers/queries/get-products.handler';
import { DeleteProductHandler } from './application/handlers/commands/delete-product.handler';

const CommandHandlers = [
  CreateProductHandler,
  UpdateProductHandler,
  DeleteProductHandler,
];
const QueryHandlers = [GetProductHandler, GetProductsHandler];

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), CqrsModule],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    {
      provide: 'ProductRepository',
      useClass: TypeOrmProductRepository,
    },
  ],
  controllers: [ProductsController],
  exports: ['ProductRepository'],
})
export class ProductsModule {}
