import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/users/entities/role.enum';
import { Public } from 'src/common/decorators/public.decorator';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductCommand } from '../../application/commands/create-product.command';
import { UpdateProductCommand } from '../../application/commands/update-product.command';
import { DeleteProductCommand } from '../../application/commands/delete-product.command';
import { CreateProductDto } from '../dto/create-product.dto';
import { GetProductsQuery } from 'src/products/application/queries/get-products.query';
import { GetProductByIdQuery } from 'src/products/application/queries/get-product-by-id.query';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Public()
  @Get()
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.queryBus.execute(
      new GetProductsQuery(paginationQueryDto.offset, paginationQueryDto.limit),
    );
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.queryBus.execute(new GetProductByIdQuery(id));
  }

  @Roles(Role.ADMIN, Role.WRITER)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.commandBus.execute(
      new CreateProductCommand(
        createProductDto.sku,
        createProductDto.name,
        createProductDto.type,
        createProductDto.description,
        createProductDto.price,
        createProductDto.salesPrice,
        createProductDto.trackInventory,
        createProductDto.totalInventory,
        createProductDto.visible,
      ),
    );
  }

  @Roles(Role.ADMIN, Role.WRITER)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.commandBus.execute(
      new UpdateProductCommand(
        id,
        updateProductDto.sku,
        updateProductDto.name,
        updateProductDto.type,
        updateProductDto.description,
        updateProductDto.price,
        updateProductDto.salesPrice,
        updateProductDto.trackInventory,
        updateProductDto.totalInventory,
        updateProductDto.visible,
      ),
    );
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.commandBus.execute(new DeleteProductCommand(id));
  }
}
