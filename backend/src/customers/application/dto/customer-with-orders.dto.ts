import { OrderDto } from './order.dto';

export class CustomerWithOrdersDto {
  constructor(
    private id: number,
    private name: string,
    private email: string | null,
    private phone: string,
    private birthDate: Date | null,
    private notes: string | null,
    private deleted: boolean = false,
    private createdAt: Date = new Date(),
    private updatedAt: Date = new Date(),
    private orders: OrderDto[],
  ) {}
}
