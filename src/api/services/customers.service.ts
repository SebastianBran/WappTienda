import { Customer } from "@/types/customers";
import http from "./http-common";

class CustomersService {
  async getAll(): Promise<Customer[]> {
    // TODO: Implement pagination
    const response = await http.get("/customers");
    return response.data;
  }

  async getById(id: number): Promise<Customer> {
    const response = await http.get(`/customers/${id}`);
    return response.data;
  }

  async create(customer: Partial<Customer>): Promise<Customer> {
    const response = await http.post("/customers", customer);
    return response.data;
  }

  async update(id: number, customer: Partial<Customer>): Promise<Customer> {
    const response = await http.patch(`/customers/${id}`, customer);
    return response.data;
  }

  async delete(id: number) {
    await http.delete(`/customers/${id}`);
  }
}

export default new CustomersService();
