import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  findAll(paginationQueryDto: PaginationQueryDto): Promise<Product[]> {
    const { limit, offset } = paginationQueryDto;

    return this.productRepository.find({
      where: { deleted: false },
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({
      id,
      deleted: false,
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);
    return this.productRepository.merge(product, updateProductDto);
  }

  async remove(id: number): Promise<Product> {
    const product = await this.findOne(id);

    if (product) {
      product.deleted = true;
      return this.productRepository.save(product);
    }

    throw new NotFoundException(`Product with ID ${id} not found`);
  }
}
