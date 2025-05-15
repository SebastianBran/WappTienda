import { CreateOrderDto, Order } from "@/types/orders";
import http from "./http-common";

class OrderService {
  async getAll(): Promise<Order[]> {
    // TODO: Implement pagination
    const response = await http.get<Order[]>("/orders");
    return response.data;
  }

  async getById(id: number): Promise<Order> {
    const response = await http.get<Order>(`/orders/${id}`);
    return response.data;
  }

  async create(order: CreateOrderDto): Promise<Order> {
    const response = await http.post<Order>("/orders", order);
    return response.data;
  }

  async update(id: number, order: Partial<Order>): Promise<Order> {
    const response = await http.patch<Order>(`/orders/${id}`, order);
    return response.data;
  }

  async delete(id: number) {
    await http.delete(`/orders/${id}`);
  }
}

export default new OrderService();
