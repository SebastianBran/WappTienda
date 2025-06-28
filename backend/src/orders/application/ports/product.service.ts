import { OrderItemProductDto } from '../dto/order-item-product.dto';

export abstract class ProductService {
  abstract getById(id: number): Promise<OrderItemProductDto>;
}
